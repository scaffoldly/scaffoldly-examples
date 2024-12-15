import { Table } from "ddb-table";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { AttributeValue as LambdaAttributeValue } from "aws-lambda";
import { DynamoDBClient, AttributeValue } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const KEY_SEPARATOR = "$";

export type Keys = {
  pk: string;
  sk: string;
};

export type BaseSchema = Keys & {
  expires?: number;
};

export type KeyPrefix = string;

export type ConditionExpression = { ConditionExpression: string };

export const preventOverwrite = (): ConditionExpression => ({
  ConditionExpression: "attribute_not_exists(pk) AND attribute_not_exists(sk)",
});

export abstract class BaseTable<
  T extends BaseSchema,
  PkPrefix extends KeyPrefix,
  SkPrefix extends KeyPrefix
> extends Table<T, "pk", "sk"> {
  constructor(
    tableName: string,
    private pkPrefix: PkPrefix,
    private skPrefix: SkPrefix
  ) {
    super({
      // No need to specify region or credentials
      // It's all provided by the execution role
      documentClient: DynamoDBDocument.from(
        new DynamoDBClient({ logger: console })
      ),
      tableName,
      primaryKey: "pk",
      sortKey: "sk",
    });
  }

  public preventOverwrite(): ConditionExpression {
    return {
      ConditionExpression: `attribute_not_exists(${this.primaryKey}) AND attribute_not_exists(${this.sortKey})`,
    };
  }

  public isRecord(
    record?:
      | AttributeValue
      | LambdaAttributeValue
      | Record<string, AttributeValue>
      | Record<string, LambdaAttributeValue>
  ): T | undefined {
    if (!record || !("pk" in record) || !("sk" in record)) {
      return undefined;
    }

    const unmarshalled = unmarshall(
      record as AttributeValue | Record<string, AttributeValue>
    );
    if (
      typeof unmarshalled.pk !== "string" ||
      typeof unmarshalled.sk !== "string" ||
      !this.pk(unmarshalled.pk, true) ||
      !this.sk(unmarshalled.sk, true)
    ) {
      return undefined;
    }

    return unmarshalled as unknown as T;
  }

  public pk(value: string = "", check = false): string {
    const prefix = `${KEY_SEPARATOR}${this.pkPrefix}${KEY_SEPARATOR}`;
    if (!check) {
      return `${prefix}${value}`;
    }
    if (!value.startsWith(prefix)) {
      return ""; // Empty string for truthy check
    }
    return value;
  }

  public sk(value: string = "", check = false): string {
    const prefix = `${KEY_SEPARATOR}${this.skPrefix}${KEY_SEPARATOR}`;
    if (!check) {
      return `${prefix}${value}`;
    }
    if (!value.startsWith(prefix)) {
      return ""; // Empty string for truthy check
    }
    return value;
  }
}

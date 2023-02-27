import { resolve } from "node:path";
import { readFile, unlink } from "node:fs/promises";

import { S3 } from "aws-sdk";
import { getType } from "mime";

import upload from "@config/upload";
import { envs } from "@config/envs";

import { IStorageProvider } from "../IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({ region: envs.awsDefaultRegion });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await readFile(originalName);

    await this.client
      .putObject({
        Key: file,
        Body: fileContent,
        ACL: "public-read",
        ContentType: getType(originalName),
        Bucket: `${envs.awsBucket}/${folder}`,
      })
      .promise();

    await unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({ Key: file, Bucket: `${envs.awsBucket}/${folder}` })
      .promise();
  }
}

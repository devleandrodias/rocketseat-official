import { S3 } from "aws-sdk";
import { resolve } from "path";
import { getType } from "mime";
import { readFile, unlink } from "fs/promises";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
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
        Bucket: `${process.env.AWS_BUKET}/${folder}`,
      })
      .promise();

    await unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Key: file,
        Bucket: `${process.env.AWS_BUKET}/${folder}`,
      })
      .promise();
  }
}

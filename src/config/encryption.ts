import crypto from "crypto";
import { config } from "dotenv";
import type { Response } from "express";

config();

const ENCRYPTION_ENABLED = process.env.ENCRYPTION_ENABLED === "true";
const ENCRYPTION_ALGORITHM = process.env.ENCRYPTION_ALGORITHM || "aes-256-cbc";
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "";
const ENCRYPTION_IV_LENGTH = parseInt(process.env.ENCRYPTION_IV_LENGTH || "16");

export function encryptData(data: string): string {
  if (!ENCRYPTION_ENABLED) return Buffer.from(data).toString("base64");

  const iv = crypto.randomBytes(ENCRYPTION_IV_LENGTH);
  const key = Buffer.from(ENCRYPTION_KEY, "base64");
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);

  let encrypted = cipher.update(data, "utf8", "base64");
  encrypted += cipher.final("base64");

  return `${iv.toString("base64")}:${encrypted}`;
}

export function decryptData(encryptedData: string): string {
  if (!ENCRYPTION_ENABLED)
    return Buffer.from(encryptedData, "base64").toString("utf8");

  const [ivString, content] = encryptedData.split(":");
  const key = Buffer.from(ENCRYPTION_KEY, "base64");
  const iv = Buffer.from(ivString, "base64");
  const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);

  let decrypted = decipher.update(content, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export function sendSecureResponse(
  res: Response,
  data: any,
  encrypt: boolean = ENCRYPTION_ENABLED
) {
  const response = encrypt ? encryptData(data) : data;

  res.header("Content-Type", "application/json");
  res.send(response).status(200);
}

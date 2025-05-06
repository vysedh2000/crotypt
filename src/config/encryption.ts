import crypto from "crypto";
import { config } from "dotenv";
import type { Request, Response } from "express";
import type { defaultRequest } from "../api/types/request.type";

config();

const ENCRYPTION_ENABLED = process.env.ENCRYPTION_ENABLED === "true";
const ENCRYPTION_ENABLED_RECEIVE =
	process.env.ENCRYPTION_ENABLED_RECEIVE === "true";
const ENCRYPTION_ALGORITHM = process.env.ENCRYPTION_ALGORITHM || "aes-256-cbc";
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "";
const ENCRYPTION_KEY1 = process.env.ENCRYPTION_KEY1 || "";
const ENCRYPTION_IV_LENGTH = parseInt(process.env.ENCRYPTION_IV_LENGTH || "16");

export function encryptData(data: string): string {
	if (!ENCRYPTION_ENABLED) return Buffer.from(data).toString("base64");

	const iv = crypto.randomBytes(ENCRYPTION_IV_LENGTH);
	const key = Buffer.from(ENCRYPTION_KEY, "base64");
	const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);

	let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
	encrypted += cipher.final("base64");

	return `${iv.toString("base64")}:${encrypted}`;
}

export function decryptData(encryptedData: string): string {
	if (!ENCRYPTION_ENABLED_RECEIVE)
		return Buffer.from(encryptedData, "base64").toString("utf8");

	const [ivString, content] = encryptedData.split(":");
	const key = Buffer.from(ENCRYPTION_KEY1, "base64");
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
	console.log(response);
	res.send(response).status(200);
}

export function getEncryptedData(req: Request) {
	try {
		if (!ENCRYPTION_ENABLED_RECEIVE) {
			return req.body;
		} else {
			let request = req.query as defaultRequest;
			if (request.payload == null) {
				request = req.body;
			}
			if (!isValidHex(request.payload)) {
				throw new Error("Invalid Hex Format");
			}

			const fromHex = (hex: string) => {
				return Buffer.from(hex, "hex").toString("utf-8");
			};
			const base64 = fromHex(request.payload);
			const data = JSON.parse(decryptData(base64));
			console.log("here", data);
			return data;
		}
	} catch (error: any) {
		return error.message;
	}
}

function isValidHex(hex: string): boolean {
	// 1. Ensure the string only contains valid hex characters
	// 2. Ensure the length of the string is even
	return /^[0-9a-fA-F]+$/.test(hex) && hex.length % 2 === 0;
}

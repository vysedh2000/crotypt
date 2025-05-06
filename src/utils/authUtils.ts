import bcrypt from "bcrypt";
import { sha256 } from "@oslojs/crypto/sha2";
import {
	encodeBase32LowerCaseNoPadding,
	encodeHexLowerCase,
} from "@oslojs/encoding";
import jsonwebtoken from "jsonwebtoken";
import config from "../config/environement";
import type { jwtSign } from "../api/types/auth.type";

export async function hashPassword(password: string) {
	const passwordSalt = process.env.PASSWORD_SALT || 10;
	return await bcrypt.hash(password, passwordSalt);
}

export async function comparePassword(password: string, hash: string) {
	return await bcrypt.compare(password, hash);
}

export function generateSession(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export function hexToText(hex: string) {
	return Buffer.from(hex, "hex").toString();
}

export function decodeToId(token: string) {
	return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
}

export function signJwt(info: jwtSign) {
	return jsonwebtoken.sign(info, config.jwtSecret || "");
}

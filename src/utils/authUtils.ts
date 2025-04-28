import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
	const passwordSalt = process.env.PASSWORD_SALT || 10;
	return await bcrypt.hash(password, passwordSalt);
}

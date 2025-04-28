import { hashPassword } from "../../utils/authUtils";
import { AuthRepository } from "../repositories/auth.repository";
import { UserRepository } from "../repositories/user.repository";
import type { createUserRequest } from "../types/auth.type";
import type { defaultResponse } from "../types/response.type";

export class AuthService {
	private authRepository: AuthRepository;
	private userRepository: UserRepository;

	constructor() {
		this.authRepository = new AuthRepository();
		this.userRepository = new UserRepository();
	}

	public async signUp(payload: createUserRequest) {
		const hashPassowrd = await hashPassword(payload.password);
		await this.authRepository.createAuth(
			payload.email,
			payload.username,
			hashPassowrd
		);
		const data = await this.userRepository.createUser(
			payload.email,
			payload.username
		);
		const response: defaultResponse = {
			status: "success",
			messaage: "",
			data: data,
		};
		return response;
	}
}

import { CryptoRepository } from "../repositories/crypto.repository";
import type {
	createCryptoDto,
	CryptoHisInsert,
	cryptoModel,
} from "../types/crypto.type";
import type { defaultResponse } from "../types/response.type";

export class CryptoService {
	private cryptoRepository: CryptoRepository;

	constructor() {
		this.cryptoRepository = new CryptoRepository();
	}

	public async getAllCryptos() {
		const data = await this.cryptoRepository.findAll();
		if (!data) {
			throw new Error("No data found!");
		}
		const response: cryptoModel[] = data;
		return response;
	}

	public async createCrypto(request: createCryptoDto) {
		const data = await this.cryptoRepository.createCrypto(request);
		if (!data) {
			throw new Error("Error adding crypto!");
		}
		const response: defaultResponse = {
			status: "success",
			code: "",
			message: "",
			data: data,
		};
		return response;
	}

	public async insertCryptoHis(request: CryptoHisInsert) {
		const data = await this.cryptoRepository.insertPriceHis(request);
		if (!data) {
			throw new Error("Error inserting data!");
		}
		const response: defaultResponse = {
			status: "success",
			code: "",
			message: "",
			data: data,
		};
		return response;
	}

	public async cryptoPriceHis(request: { symbol: string }) {
		const data = await this.cryptoRepository.cryptoPriceHis(request);
		if (!data) {
			throw new Error("Error get data!");
		}
		const response: defaultResponse = {
			status: "success",
			code: "",
			message: "",
			data: data,
		};
		return response;
	}
}

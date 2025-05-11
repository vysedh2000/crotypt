import { z } from "zod";

export const defaultResponse = z.object({
	status: z.string(),
	message: z.string(),
	code: z.string(),
	data: z.any().optional(),
});
export function createErrorResponse(
	message: string,
	code?: string
): defaultResponse {
	return {
		status: "fail",
		code: code || "",
		message: message,
		data: [],
	};
}
export type defaultResponse = z.infer<typeof defaultResponse>;

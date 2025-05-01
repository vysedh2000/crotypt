import { z } from "zod";

export const defaultResponse = z.object({
	status: z.string(),
	message: z.string(),
	data: z.any().optional(),
});
export function createErrorResponse(message: string): defaultResponse {
	return {
		status: "fail",
		message: message,
		data: [],
	};
}
export type defaultResponse = z.infer<typeof defaultResponse>;

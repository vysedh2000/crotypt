import { Router } from "express";
import cryptoRoute from "./routes/crypto.route";
import authRoute from "./routes/auth.route";

export default () => {
	const app = Router();

	cryptoRoute(app);
	authRoute(app);

	return app;
};

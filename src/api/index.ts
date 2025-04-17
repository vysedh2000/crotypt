import { Router } from "express";
import cryptoRoute from "./routes/crypto.route";

export default () => {
  const app = Router();

  cryptoRoute(app);

  return app;
};

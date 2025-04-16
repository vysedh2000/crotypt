import { Router } from "express";
import stockRoute from "./routes/mock/stock.route";

export default () => {
  const app = Router();
  stockRoute(app);

  return app;
};

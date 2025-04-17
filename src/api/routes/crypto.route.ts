import { Router } from "express";
import { CryptoController } from "../controllers/crypto.controller";

const router = Router();
const cryptoController = new CryptoController();

export default (app: Router) => {
  app.use("/crypto", router);
  router.get("/all", cryptoController.getAll);
};

import { Router } from "express";
import { CryptoController } from "../controllers/crypto.controller";
import routeAuth from "../../auth/route-auth";

const router = Router();
const cryptoController = new CryptoController();

export default (app: Router) => {
	app.use("/crypto", router);
	router.get("/all", cryptoController.getAll);
	router.post("/create", cryptoController.create);
	router.post("/addpricehis", cryptoController.insertPriceHis);
	router.get("/pricehis", cryptoController.cryptoPriceHis);
};

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import routeAuth from "../../auth/route-auth";

const router = Router();
const authController = new AuthController();

export default (app: Router) => {
	app.use("/auth", router);
	router.post("/signup", authController.signup);
	router.post("/login", authController.login);
	router.get("/test", routeAuth(authController.test));
};

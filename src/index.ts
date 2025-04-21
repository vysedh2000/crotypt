import "reflect-metadata"; // We need this in order to use @Decorators

import express from "express";
import config from "../src/config/environement";
import Logger from "../src/logger/logger";

async function startServer() {
  console.log("Starting server initialization...");

  try {
    const app = express();

    await require("./loaders").default({ expressApp: app });

    app
      .listen(config.port, () => {
        Logger.info(`
        ------------------------------------------------
        🚀  Server listening on port: ${config.port} 🚀
        ------------------------------------------------
        🚀  Environment: ${config.env} 🚀
        ------------------------------------------------
        🚀  Application Name: ${config.appName} 🚀
        ------------------------------------------------
        🚀  Application Version: ${config.appVersion} 🚀
        ------------------------------------------------
        `);
      })
      .on("error", err => {
        console.error("Server start error:", err);
        Logger.error(err);
        process.exit(1);
      });
  } catch (error) {
    console.error("Catastrophic server initialization error:", error);
    process.exit(1);
  }
}

startServer();

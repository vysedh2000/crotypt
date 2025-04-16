import { Router } from "express";
import { generateMockPriceUpdate, initialStocks } from "../../service/mockData";
import type { Stock } from "../../model/stock";

const router = Router();

export default (app: Router) => {
  app.use("", router);
  router.get("/stock", (req, res) => {
    const data = initialStocks.map(stock => ({
      ...stock,
      price: Number(stock.price.toFixed(2)),
      previousPrice: Number(stock.previousPrice.toFixed(2)),
      percentageChange: Number(stock.percentageChange.toFixed(2)),
    }));
    const newData: Stock[] = [];
    data.forEach(stock => {
      const newStock = generateMockPriceUpdate(stock);
      newData.push(newStock);
    });
    res.send(newData);
  });
};

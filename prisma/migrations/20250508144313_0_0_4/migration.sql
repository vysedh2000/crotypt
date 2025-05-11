/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Crypto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "CryptoHistory" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ccy" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "insertAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CryptoHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockHistory" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ccy" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "insertAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CryptoHistory_id_key" ON "CryptoHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StockHistory_id_key" ON "StockHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Crypto_id_key" ON "Crypto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_id_key" ON "Stock"("id");

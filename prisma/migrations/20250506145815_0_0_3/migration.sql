/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[symbol]` on the table `Crypto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[symbol]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[auth_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wallet_id` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ccy` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ccy` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balance` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ccy` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_crypto_id_fkey";

-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_stock_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_wallet_id_fkey";

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "wallet_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Crypto" ADD COLUMN     "ccy" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "symbol" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "ccy" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "symbol" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "auth_id" TEXT,
ADD COLUMN     "country" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "balance" TEXT NOT NULL,
ADD COLUMN     "ccy" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "totp_key" BYTEA,
    "last_login" TIMESTAMP(3),
    "uid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_uid_key" ON "Auth"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Crypto_symbol_key" ON "Crypto"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_symbol_key" ON "Stock"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_auth_id_key" ON "User"("auth_id");

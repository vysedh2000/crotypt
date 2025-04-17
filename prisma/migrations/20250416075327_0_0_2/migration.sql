/*
  Warnings:

  - Added the required column `price` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volume` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volume` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crypto" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "volume" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "volume" DOUBLE PRECISION NOT NULL;

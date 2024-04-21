/*
  Warnings:

  - You are about to drop the `Liking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Liking" DROP CONSTRAINT "Liking_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Liking" DROP CONSTRAINT "Liking_userId_fkey";

-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- DropTable
DROP TABLE "Liking";

-- DropEnum
DROP TYPE "LikingValue";

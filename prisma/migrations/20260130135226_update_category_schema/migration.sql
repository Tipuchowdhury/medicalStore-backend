/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Medicine` table. All the data in the column will be lost.
  - Added the required column `category` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_categoryId_fkey";

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT NOT NULL;

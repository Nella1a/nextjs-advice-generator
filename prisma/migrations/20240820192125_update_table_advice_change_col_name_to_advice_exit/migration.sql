/*
  Warnings:

  - You are about to drop the column `text` on the `advice` table. All the data in the column will be lost.
  - Added the required column `advice` to the `advice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "advice" DROP COLUMN "text",
ADD COLUMN     "advice" TEXT NOT NULL;

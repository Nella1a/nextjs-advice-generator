/*
  Warnings:

  - You are about to drop the `_AdviceToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user` to the `advice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AdviceToUser" DROP CONSTRAINT "_AdviceToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdviceToUser" DROP CONSTRAINT "_AdviceToUser_B_fkey";

-- AlterTable
ALTER TABLE "advice" ADD COLUMN     "user" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AdviceToUser";

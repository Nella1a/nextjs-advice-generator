/*
  Warnings:

  - You are about to drop the `Advice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AdviceToUser" DROP CONSTRAINT "_AdviceToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdviceToUser" DROP CONSTRAINT "_AdviceToUser_B_fkey";

-- DropTable
DROP TABLE "Advice";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advice" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "advice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "advice_externalId_key" ON "advice"("externalId");

-- AddForeignKey
ALTER TABLE "_AdviceToUser" ADD CONSTRAINT "_AdviceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "advice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdviceToUser" ADD CONSTRAINT "_AdviceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

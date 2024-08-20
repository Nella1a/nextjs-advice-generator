-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advice" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Advice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdviceToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Advice_externalId_key" ON "Advice"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "_AdviceToUser_AB_unique" ON "_AdviceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AdviceToUser_B_index" ON "_AdviceToUser"("B");

-- AddForeignKey
ALTER TABLE "_AdviceToUser" ADD CONSTRAINT "_AdviceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Advice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdviceToUser" ADD CONSTRAINT "_AdviceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

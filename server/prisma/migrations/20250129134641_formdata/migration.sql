/*
  Warnings:

  - A unique constraint covering the columns `[secret]` on the table `Api` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "FormData" (
    "id" TEXT NOT NULL,
    "apiId" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "FormData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Api_secret_key" ON "Api"("secret");

-- AddForeignKey
ALTER TABLE "FormData" ADD CONSTRAINT "FormData_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES "Api"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to alter the column `cpf` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(60)` to `VarChar(14)`.
  - You are about to alter the column `cellphone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(60)` to `VarChar(15)`.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(14),
ALTER COLUMN "birthday" SET DATA TYPE TEXT,
ALTER COLUMN "cellphone" SET DATA TYPE VARCHAR(15);

/*
  Warnings:

  - You are about to alter the column `cpf` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `VarChar(60)` to `VarChar(14)`.
  - A unique constraint covering the columns `[cpf]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "city" VARCHAR(100) NOT NULL,
ADD COLUMN     "neighborhood" VARCHAR(100) NOT NULL,
ADD COLUMN     "uf" VARCHAR(2) NOT NULL,
ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(14);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_cpf_key" ON "Contact"("cpf");

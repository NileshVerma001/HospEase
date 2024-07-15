/*
  Warnings:

  - Added the required column `avaiblebeds` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avgprice` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalbeds` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "avaiblebeds" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "avgprice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalbeds" DOUBLE PRECISION NOT NULL;

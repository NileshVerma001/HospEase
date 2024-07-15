/*
  Warnings:

  - Added the required column `doc` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "doc" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `place` on the `Event` table. All the data in the column will be lost.
  - Added the required column `location` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "place",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT;

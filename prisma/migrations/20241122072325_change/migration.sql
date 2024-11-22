/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Airlines` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `TravelAgency` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Airlines_name_key" ON "Airlines"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TravelAgency_name_key" ON "TravelAgency"("name");

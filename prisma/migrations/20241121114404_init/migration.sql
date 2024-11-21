-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'TravelAgent');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "surname" VARCHAR(40) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "password" VARCHAR(40) NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airlines" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "logo" TEXT NOT NULL,
    "plane" VARCHAR(40) NOT NULL,

    CONSTRAINT "Airlines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravelAgency" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,

    CONSTRAINT "TravelAgency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tour" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "travelAgencyId" INTEGER NOT NULL,
    "airlinesId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderTour" (
    "id" SERIAL NOT NULL,
    "tourId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderTour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Includes" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "tourId" INTEGER NOT NULL,

    CONSTRAINT "Includes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotIncludes" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "tourId" INTEGER NOT NULL,

    CONSTRAINT "NotIncludes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "flightTime" TEXT NOT NULL,
    "tourId" INTEGER NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pictures" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "tourId" INTEGER NOT NULL,

    CONSTRAINT "Pictures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_key" ON "Order"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderTour_tourId_key" ON "OrderTour"("tourId");

-- CreateIndex
CREATE UNIQUE INDEX "Data_tourId_key" ON "Data"("tourId");

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_travelAgencyId_fkey" FOREIGN KEY ("travelAgencyId") REFERENCES "TravelAgency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_airlinesId_fkey" FOREIGN KEY ("airlinesId") REFERENCES "Airlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTour" ADD CONSTRAINT "OrderTour_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTour" ADD CONSTRAINT "OrderTour_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Includes" ADD CONSTRAINT "Includes_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotIncludes" ADD CONSTRAINT "NotIncludes_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pictures" ADD CONSTRAINT "Pictures_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

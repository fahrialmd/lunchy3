/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedBy` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedBy` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `OrderStatus` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `OrderStatus` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedBy` on the `OrderStatus` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OrderStatus` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedBy` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
DROP COLUMN "modifiedBy",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "public"."OrderItem" DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
DROP COLUMN "modifiedBy",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "public"."OrderStatus" DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
DROP COLUMN "modifiedBy",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "public"."PaymentMethod" DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
DROP COLUMN "modifiedBy",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
DROP COLUMN "modifiedBy",
DROP COLUMN "updatedAt",
ADD COLUMN     "avatar" VARCHAR(255) NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

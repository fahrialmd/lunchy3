-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'BUYER', 'VERIFIED');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "roles" "public"."UserRole"[];

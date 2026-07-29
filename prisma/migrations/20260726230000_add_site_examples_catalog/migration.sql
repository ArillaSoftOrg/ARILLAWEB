-- CreateEnum
CREATE TYPE "ProjectKind" AS ENUM ('LIVE_DEMO', 'DESIGN_CONCEPT', 'CLIENT_PROJECT');

-- CreateEnum
CREATE TYPE "DesignInquirySource" AS ENUM ('FORM', 'WHATSAPP');

-- AlterTable
ALTER TABLE "ProjectCategory"
ADD COLUMN "description" TEXT,
ADD COLUMN "coverImage" TEXT,
ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "isCatalogSector" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Project"
ADD COLUMN "kind" "ProjectKind" NOT NULL DEFAULT 'CLIENT_PROJECT',
ADD COLUMN "designCode" TEXT,
ADD COLUMN "styleTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "recommendedPages" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "featureHighlights" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "customizationNote" TEXT,
ADD COLUMN "sourceDesignUrl" TEXT,
ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "DesignInquiry" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "message" TEXT,
    "projectId" TEXT,
    "designCode" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "source" "DesignInquirySource" NOT NULL DEFAULT 'FORM',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DesignInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_designCode_key" ON "Project"("designCode");

-- CreateIndex
CREATE INDEX "DesignInquiry_designCode_idx" ON "DesignInquiry"("designCode");

-- CreateIndex
CREATE INDEX "DesignInquiry_createdAt_idx" ON "DesignInquiry"("createdAt");

-- AddForeignKey
ALTER TABLE "DesignInquiry" ADD CONSTRAINT "DesignInquiry_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

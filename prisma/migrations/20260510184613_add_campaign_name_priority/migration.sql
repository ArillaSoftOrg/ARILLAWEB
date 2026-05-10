-- AlterTable
ALTER TABLE "AnnouncementBar" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Campaign',
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;

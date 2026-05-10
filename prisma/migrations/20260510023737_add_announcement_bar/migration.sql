-- CreateTable
CREATE TABLE "AnnouncementBar" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "text" TEXT NOT NULL DEFAULT '',
    "description" TEXT,
    "backgroundColor" TEXT NOT NULL DEFAULT '#dc2626',
    "textColor" TEXT NOT NULL DEFAULT '#ffffff',
    "dismissible" BOOLEAN NOT NULL DEFAULT false,
    "countdownEnabled" BOOLEAN NOT NULL DEFAULT false,
    "countdownMode" TEXT NOT NULL DEFAULT 'fixed',
    "startsAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "dailyResetHour" INTEGER NOT NULL DEFAULT 0,
    "dailyResetMinute" INTEGER NOT NULL DEFAULT 0,
    "scrollEnabled" BOOLEAN NOT NULL DEFAULT false,
    "scrollSpeed" TEXT NOT NULL DEFAULT 'normal',
    "targetMode" TEXT NOT NULL DEFAULT 'all',
    "targetRoutes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnnouncementBar_pkey" PRIMARY KEY ("id")
);

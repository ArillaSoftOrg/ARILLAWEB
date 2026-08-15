-- Keep the current public barrier enabled after deploying this migration.
ALTER TABLE "SiteSetting"
ADD COLUMN "maintenanceModeEnabled" BOOLEAN NOT NULL DEFAULT true;

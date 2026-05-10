-- AlterTable
ALTER TABLE "AppointmentRequest" ADD COLUMN "phone" TEXT,
ADD COLUMN "email" TEXT;

-- Migrate data from contact to email if it looks like an email, otherwise to phone
UPDATE "AppointmentRequest"
SET email = CASE
  WHEN contact LIKE '%@%' THEN contact
  ELSE NULL
END,
phone = CASE
  WHEN contact NOT LIKE '%@%' THEN contact
  ELSE NULL
END;

-- DropColumn
ALTER TABLE "AppointmentRequest" DROP COLUMN "contact";

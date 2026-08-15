-- Fix "mobilye" (furniture) typo in the homepageIntro default/content; should read "mobile".
ALTER TABLE "SiteSetting"
ALTER COLUMN "homepageIntro" SET DEFAULT 'Web''den mobile, backend''den UI/UX tasarımına — uçtan uca dijital dönüşüm hizmetleri.';

UPDATE "SiteSetting"
SET "homepageIntro" = 'Web''den mobile, backend''den UI/UX tasarımına — uçtan uca dijital dönüşüm hizmetleri.'
WHERE "homepageIntro" LIKE '%mobilye%';

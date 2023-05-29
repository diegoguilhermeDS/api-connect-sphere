-- DropForeignKey
ALTER TABLE "informations" DROP CONSTRAINT "informations_clientId_fkey";

-- DropForeignKey
ALTER TABLE "informations" DROP CONSTRAINT "informations_contactId_fkey";

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

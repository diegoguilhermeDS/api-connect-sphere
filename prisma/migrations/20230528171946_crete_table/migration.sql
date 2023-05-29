-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "informations" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "clientId" TEXT,
    "contactId" TEXT,

    CONSTRAINT "informations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients_contacts" (
    "id" TEXT NOT NULL,
    "ClientId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "clients_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "informations_email_key" ON "informations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "informations_phone_key" ON "informations"("phone");

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients_contacts" ADD CONSTRAINT "clients_contacts_ClientId_fkey" FOREIGN KEY ("ClientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients_contacts" ADD CONSTRAINT "clients_contacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

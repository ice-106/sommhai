/*
  Warnings:

  - You are about to drop the column `accept` on the `InvitationLetter` table. All the data in the column will be lost.
  - You are about to drop the `EventInvitation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventInvitation" DROP CONSTRAINT "EventInvitation_eid_fkey";

-- DropForeignKey
ALTER TABLE "EventInvitation" DROP CONSTRAINT "EventInvitation_letter_id_fkey";

-- AlterTable
ALTER TABLE "InvitationLetter" DROP COLUMN "accept";

-- DropTable
DROP TABLE "EventInvitation";

-- CreateTable
CREATE TABLE "AttendeeInvitation" (
    "id" TEXT NOT NULL,
    "eid" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "accept" BOOLEAN,

    CONSTRAINT "AttendeeInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizerInvitation" (
    "id" TEXT NOT NULL,
    "eid" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "accept" BOOLEAN,

    CONSTRAINT "OrganizerInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AttendeeInvitationToInvitationLetter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AttendeeInvitationToInvitationLetter_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "AttendeeInvitation_eid_uid_key" ON "AttendeeInvitation"("eid", "uid");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizerInvitation_eid_uid_key" ON "OrganizerInvitation"("eid", "uid");

-- CreateIndex
CREATE INDEX "_AttendeeInvitationToInvitationLetter_B_index" ON "_AttendeeInvitationToInvitationLetter"("B");

-- AddForeignKey
ALTER TABLE "AttendeeInvitation" ADD CONSTRAINT "AttendeeInvitation_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendeeInvitation" ADD CONSTRAINT "AttendeeInvitation_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizerInvitation" ADD CONSTRAINT "OrganizerInvitation_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizerInvitation" ADD CONSTRAINT "OrganizerInvitation_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendeeInvitationToInvitationLetter" ADD CONSTRAINT "_AttendeeInvitationToInvitationLetter_A_fkey" FOREIGN KEY ("A") REFERENCES "AttendeeInvitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendeeInvitationToInvitationLetter" ADD CONSTRAINT "_AttendeeInvitationToInvitationLetter_B_fkey" FOREIGN KEY ("B") REFERENCES "InvitationLetter"("letter_id") ON DELETE CASCADE ON UPDATE CASCADE;

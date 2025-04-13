/*
  Warnings:

  - You are about to drop the `_AttendeeInvitationToInvitationLetter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AttendeeInvitationToInvitationLetter" DROP CONSTRAINT "_AttendeeInvitationToInvitationLetter_A_fkey";

-- DropForeignKey
ALTER TABLE "_AttendeeInvitationToInvitationLetter" DROP CONSTRAINT "_AttendeeInvitationToInvitationLetter_B_fkey";

-- AlterTable
ALTER TABLE "AttendeeInvitation" ADD COLUMN     "letter_id" TEXT;

-- DropTable
DROP TABLE "_AttendeeInvitationToInvitationLetter";

-- AddForeignKey
ALTER TABLE "AttendeeInvitation" ADD CONSTRAINT "AttendeeInvitation_letter_id_fkey" FOREIGN KEY ("letter_id") REFERENCES "InvitationLetter"("letter_id") ON DELETE CASCADE ON UPDATE CASCADE;

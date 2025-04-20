/*
  Warnings:

  - You are about to drop the `AttendeeInvitation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvitationLetter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Leaderboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrganizerInvitation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Preference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionResponse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Receive` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "InviteRole" AS ENUM ('ATTENDEE', 'ORGANIZER');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('SHORT_ANSWER', 'MULTIPLE_CHOICE', 'CHECKBOX');

-- DropForeignKey
ALTER TABLE "AttendeeInvitation" DROP CONSTRAINT "AttendeeInvitation_eid_fkey";

-- DropForeignKey
ALTER TABLE "AttendeeInvitation" DROP CONSTRAINT "AttendeeInvitation_letter_id_fkey";

-- DropForeignKey
ALTER TABLE "AttendeeInvitation" DROP CONSTRAINT "AttendeeInvitation_uid_fkey";

-- DropForeignKey
ALTER TABLE "EventQuestion" DROP CONSTRAINT "EventQuestion_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_eid_fkey";

-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_uid_fkey";

-- DropForeignKey
ALTER TABLE "OrganizerInvitation" DROP CONSTRAINT "OrganizerInvitation_eid_fkey";

-- DropForeignKey
ALTER TABLE "OrganizerInvitation" DROP CONSTRAINT "OrganizerInvitation_uid_fkey";

-- DropForeignKey
ALTER TABLE "Preference" DROP CONSTRAINT "Preference_letter_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionResponse" DROP CONSTRAINT "QuestionResponse_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionResponse" DROP CONSTRAINT "QuestionResponse_userId_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_letter_id_fkey";

-- DropForeignKey
ALTER TABLE "Receive" DROP CONSTRAINT "Receive_letter_id_fkey";

-- DropForeignKey
ALTER TABLE "Receive" DROP CONSTRAINT "Receive_uid_fkey";

-- DropTable
DROP TABLE "AttendeeInvitation";

-- DropTable
DROP TABLE "EventQuestion";

-- DropTable
DROP TABLE "InvitationLetter";

-- DropTable
DROP TABLE "Leaderboard";

-- DropTable
DROP TABLE "OrganizerInvitation";

-- DropTable
DROP TABLE "Preference";

-- DropTable
DROP TABLE "QuestionResponse";

-- DropTable
DROP TABLE "Questions";

-- DropTable
DROP TABLE "Receive";

-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "InviteRole" NOT NULL,
    "accept" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "inviteId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "options" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "answer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Invite_eventId_idx" ON "Invite"("eventId");

-- CreateIndex
CREATE INDEX "Invite_userId_idx" ON "Invite"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_eventId_userId_role_key" ON "Invite"("eventId", "userId", "role");

-- CreateIndex
CREATE INDEX "Question_inviteId_idx" ON "Question"("inviteId");

-- CreateIndex
CREATE INDEX "Response_questionId_idx" ON "Response"("questionId");

-- CreateIndex
CREATE INDEX "Response_userId_idx" ON "Response"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Response_questionId_userId_key" ON "Response"("questionId", "userId");

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "Invite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

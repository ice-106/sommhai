/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Response` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_inviteId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_userId_fkey";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Response";

-- CreateTable
CREATE TABLE "EventQuestion" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "options" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionResponse" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "answer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "eid" TEXT NOT NULL,
    "score" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventQuestion_eventId_idx" ON "EventQuestion"("eventId");

-- CreateIndex
CREATE INDEX "QuestionResponse_questionId_idx" ON "QuestionResponse"("questionId");

-- CreateIndex
CREATE INDEX "QuestionResponse_userId_idx" ON "QuestionResponse"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionResponse_questionId_userId_key" ON "QuestionResponse"("questionId", "userId");

-- CreateIndex
CREATE INDEX "Leaderboard_uid_idx" ON "Leaderboard"("uid");

-- CreateIndex
CREATE INDEX "Leaderboard_eid_idx" ON "Leaderboard"("eid");

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_uid_eid_key" ON "Leaderboard"("uid", "eid");

-- AddForeignKey
ALTER TABLE "EventQuestion" ADD CONSTRAINT "EventQuestion_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "EventQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

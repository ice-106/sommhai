-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "pref_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "payment_method" TEXT,
    "subscription_plan" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Event" (
    "eid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "place" TEXT NOT NULL,
    "description" TEXT,
    "invite_list" INTEGER NOT NULL,
    "memory" TEXT,
    "host" TEXT NOT NULL,
    "host_uid" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eid")
);

-- CreateTable
CREATE TABLE "History" (
    "eid" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("eid","uid")
);

-- CreateTable
CREATE TABLE "Attendee" (
    "uid" TEXT NOT NULL,
    "eid" TEXT NOT NULL,

    CONSTRAINT "Attendee_pkey" PRIMARY KEY ("uid","eid")
);

-- CreateTable
CREATE TABLE "Attending" (
    "uid" TEXT NOT NULL,
    "eid" TEXT NOT NULL,

    CONSTRAINT "Attending_pkey" PRIMARY KEY ("uid","eid")
);

-- CreateTable
CREATE TABLE "Organizer" (
    "uid" TEXT NOT NULL,
    "eid" TEXT NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("uid","eid")
);

-- CreateTable
CREATE TABLE "Create" (
    "uid" TEXT NOT NULL,
    "eid" TEXT NOT NULL,

    CONSTRAINT "Create_pkey" PRIMARY KEY ("uid","eid")
);

-- CreateTable
CREATE TABLE "Media" (
    "media_id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "eid" TEXT NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "Update" (
    "log_id" TEXT NOT NULL,
    "eid" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date_of_message" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Update_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "InvitationLetter" (
    "letter_id" TEXT NOT NULL,
    "accept" BOOLEAN,
    "description" TEXT,

    CONSTRAINT "InvitationLetter_pkey" PRIMARY KEY ("letter_id")
);

-- CreateTable
CREATE TABLE "Receive" (
    "uid" TEXT NOT NULL,
    "letter_id" TEXT NOT NULL,

    CONSTRAINT "Receive_pkey" PRIMARY KEY ("uid","letter_id")
);

-- CreateTable
CREATE TABLE "EventInvitation" (
    "eid" TEXT NOT NULL,
    "letter_id" TEXT NOT NULL,

    CONSTRAINT "EventInvitation_pkey" PRIMARY KEY ("eid","letter_id")
);

-- CreateTable
CREATE TABLE "Preference" (
    "preference_id" TEXT NOT NULL,
    "letter_id" TEXT NOT NULL,
    "notes" TEXT,
    "seat" TEXT,
    "food" TEXT,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("preference_id","letter_id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "question_id" TEXT NOT NULL,
    "letter_id" TEXT NOT NULL,
    "question" TEXT,
    "answer" TEXT,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("question_id","letter_id")
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "name" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "eid" TEXT NOT NULL,
    "score" INTEGER,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_host_uid_fkey" FOREIGN KEY ("host_uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attending" ADD CONSTRAINT "Attending_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attending" ADD CONSTRAINT "Attending_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Create" ADD CONSTRAINT "Create_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Create" ADD CONSTRAINT "Create_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receive" ADD CONSTRAINT "Receive_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receive" ADD CONSTRAINT "Receive_letter_id_fkey" FOREIGN KEY ("letter_id") REFERENCES "InvitationLetter"("letter_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInvitation" ADD CONSTRAINT "EventInvitation_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInvitation" ADD CONSTRAINT "EventInvitation_letter_id_fkey" FOREIGN KEY ("letter_id") REFERENCES "InvitationLetter"("letter_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_letter_id_fkey" FOREIGN KEY ("letter_id") REFERENCES "InvitationLetter"("letter_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_letter_id_fkey" FOREIGN KEY ("letter_id") REFERENCES "InvitationLetter"("letter_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

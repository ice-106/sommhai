-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "payment_method" TEXT,
    "subscription_plan" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Event" (
    "eid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "place" TEXT NOT NULL,
    "description" TEXT,
    "number_of_attendees" INTEGER NOT NULL,
    "memory" TEXT,
    "feedbacks" TEXT,
    "hostId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eid")
);

-- CreateTable
CREATE TABLE "Attendee" (
    "uid" TEXT NOT NULL,
    "eid" TEXT NOT NULL,

    CONSTRAINT "Attendee_pkey" PRIMARY KEY ("uid","eid")
);

-- CreateTable
CREATE TABLE "Organizer" (
    "uid" TEXT NOT NULL,
    "eid" TEXT NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("uid","eid")
);

-- CreateTable
CREATE TABLE "Media" (
    "media_id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "taken_by_id" TEXT,
    "eid" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "Updates" (
    "log_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "acknowledge" BOOLEAN NOT NULL,
    "date_of_message" TIMESTAMP(3) NOT NULL,
    "eid" TEXT NOT NULL,

    CONSTRAINT "Updates_pkey" PRIMARY KEY ("log_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_taken_by_id_fkey" FOREIGN KEY ("taken_by_id") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Updates" ADD CONSTRAINT "Updates_eid_fkey" FOREIGN KEY ("eid") REFERENCES "Event"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

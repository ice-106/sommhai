/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker/locale/en';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Users
  const users = await prisma.user.createMany({
    data: Array.from({ length: 10 }, () => ({
      phone: faker.phone.number(),
      email: faker.internet.email(),
      dob: faker.date.birthdate(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      pref_name: faker.person.fullName(),
      payment_method: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Bank Transfer']),
      subscription_plan: faker.helpers.arrayElement(['Free', 'Basic', 'Premium']),
    })),
  });

  // Fetch created users
  const userList = await prisma.user.findMany();

  // Create Events
  const events = await prisma.event.createMany({
    data: userList.map((user: { pref_name: any; uid: any }) => ({
      name: faker.lorem.words(3),
      date: faker.date.future(),
      time: faker.date.soon(),
      location: faker.location.city(),
      description: faker.lorem.sentence(),
      invite_list: faker.number.int({ min: 1, max: 99 }),
      memory: faker.lorem.sentence(),
      host: user.pref_name,
      host_uid: user.uid,
      picture: [faker.image.urlPicsumPhotos()],
      status: faker.helpers.arrayElement(['Upcoming', 'Ongoing', 'Completed']),
    })),
  });

  // Fetch created events
  const eventList = await prisma.event.findMany();

  // Create Histories
  for (const event of eventList) {
    for (let i = 0; i < 2; i++) {
      const user = faker.helpers.arrayElement(userList) as (typeof userList)[0];
      try {
        await prisma.history.create({
          data: {
            eid: event.eid,
            uid: user.uid,
          },
        });
      } catch (error) {
        // Skip if this user-event combination already exists
        console.log(`History already exists for user ${user.uid} and event ${event.eid}`);
      }
    }
  }

  // Create Attendees
  for (const event of eventList) {
    for (let i = 0; i < 3; i++) {
      const user = faker.helpers.arrayElement(userList) as (typeof userList)[0];
      try {
        await prisma.attendee.create({
          data: {
            uid: user.uid,
            eid: event.eid,
          },
        });
      } catch (error) {
        // Skip if this user-event combination already exists
        console.log(`Attendee already exists for user ${user.uid} and event ${event.eid}`);
      }
    }
  }

  // Create Attending
  for (const event of eventList) {
    for (let i = 0; i < 2; i++) {
      const user = faker.helpers.arrayElement(userList) as (typeof userList)[0];
      try {
        await prisma.attending.create({
          data: {
            uid: user.uid,
            eid: event.eid,
          },
        });
      } catch (error) {
        // Skip if this user-event combination already exists
        console.log(`Attending already exists for user ${user.uid} and event ${event.eid}`);
      }
    }
  }

  // Create Organizers
  for (const event of eventList) {
    const user = faker.helpers.arrayElement(userList) as (typeof userList)[0];
    try {
      await prisma.organizer.create({
        data: {
          uid: user.uid,
          eid: event.eid,
        },
      });
    } catch (error) {
      // Skip if this user-event combination already exists
      console.log(`Organizer already exists for user ${user.uid} and event ${event.eid}`);
    }
  }

  // Create Media
  for (const event of eventList) {
    await prisma.media.create({
      data: {
        source: faker.image.urlPicsumPhotos(),
        uid: (faker.helpers.arrayElement(userList) as (typeof userList)[0]).uid,
        eid: event.eid,
      },
    });
  }

  // Create Updates (now called Update in the schema)
  for (const event of eventList) {
    await prisma.update.create({
      data: {
        message: faker.lorem.sentence(),
        date_of_message: faker.date.recent(),
        eid: event.eid,
      },
    });
  }

  // Create InvitationLetters
  const invitationLetters = await prisma.invitationLetter.createMany({
    data: Array.from({ length: 5 }, () => ({
      description: faker.lorem.paragraph(),
    })),
  });

  // Fetch created invitation letters
  const invitationLetterList = await prisma.invitationLetter.findMany();

  // Create Receives
  for (const letter of invitationLetterList) {
    const user = faker.helpers.arrayElement(userList) as (typeof userList)[0];
    try {
      await prisma.receive.create({
        data: {
          uid: user.uid,
          letter_id: letter.letter_id,
        },
      });
    } catch (error) {
      console.log(`Receive already exists for user ${user.uid} and letter ${letter.letter_id}`);
    }
  }

  // Create Preferences
  for (const letter of invitationLetterList) {
    await prisma.preference.create({
      data: {
        preference_id: faker.string.alphanumeric(7),
        letter_id: letter.letter_id,
        notes: faker.lorem.sentence(),
        seat: `Table ${faker.number.int({ min: 1, max: 20 })}`,
        food: faker.helpers.arrayElement(['Vegetarian', 'Vegan', 'No restrictions', 'Gluten-free']),
      },
    });
  }

  // Create Questions
  for (const letter of invitationLetterList) {
    await prisma.questions.create({
      data: {
        question_id: faker.string.uuid(),
        letter_id: letter.letter_id,
        question: faker.lorem.sentence() + '?',
        answer: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      },
    });
  }

  // Create Leaderboards
  for (const event of eventList) {
    await prisma.leaderboard.create({
      data: {
        name: faker.lorem.words(2),
        uid: (faker.helpers.arrayElement(userList) as (typeof userList)[0]).uid,
        eid: event.eid,
        score: faker.number.int({ min: 0, max: 1000 }),
      },
    });
  }

  // Create Creates
  for (const event of eventList) {
    const user = faker.helpers.arrayElement(userList) as (typeof userList)[0];
    try {
      await prisma.create.create({
        data: {
          uid: user.uid,
          eid: event.eid,
        },
      });
    } catch (error) {
      console.log(`Create already exists for user ${user.uid} and event ${event.eid}`);
    }
  }

  // Create Organizer Invitations
  console.log('Creating organizer invitations...');
  for (const event of eventList) {
    // Find users who are already attendees but not organizers
    const existingOrganizers = await prisma.organizer.findMany({
      where: { eid: event.eid },
      select: { uid: true },
    });

    const existingOrganizerIds = existingOrganizers.map((o) => o.uid);

    const attendees = await prisma.attendee.findMany({
      where: { eid: event.eid },
      select: { uid: true },
    });

    const eligibleAttendees = attendees.filter((a) => !existingOrganizerIds.includes(a.uid));

    // Better approach: Process only the first 2 eligible attendees using slice
    // This ensures we never try to access an element beyond the array length
    const attendeesToInvite = eligibleAttendees.slice(0, 2);

    for (const attendeeToInvite of attendeesToInvite) {
      try {
        await prisma.organizerInvitation.create({
          data: {
            eid: event.eid,
            uid: attendeeToInvite.uid,
            accept: null, // pending
          },
        });
        console.log(`Created organizer invitation for user ${attendeeToInvite.uid} to event ${event.eid}`);
      } catch (error) {
        console.log(`Error creating organizer invitation for user ${attendeeToInvite.uid} to event ${event.eid}`);
      }
    }
  }

  // Create Attendee Invitations
  console.log('Creating attendee invitations...');
  for (const event of eventList) {
    // Get an invitation letter to connect (optional)
    const invitationLetter = await prisma.invitationLetter.findFirst();

    const existingAttendees = await prisma.attendee.findMany({
      where: { eid: event.eid },
      select: { uid: true },
    });

    const existingAttendeeIds = existingAttendees.map((a) => a.uid);
    const eligibleUsers = userList.filter((user) => !existingAttendeeIds.includes(user.uid));

    const usersToInvite = eligibleUsers.slice(0, 2);

    for (const userToInvite of usersToInvite) {
      try {
        // Create attendee invitation with optional letter reference
        await prisma.attendeeInvitation.create({
          data: {
            eid: event.eid,
            uid: userToInvite.uid,
            accept: null,
            letter_id: invitationLetter?.letter_id, // Optional connection
          },
        });
        console.log(`Created attendee invitation for user ${userToInvite.uid} to event ${event.eid}`);
      } catch (error) {
        console.log(`Error creating attendee invitation for user ${userToInvite.uid} to event ${event.eid}:`, error);
      }
    }
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

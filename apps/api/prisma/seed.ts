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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
      console.log(error);
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
      accept: faker.datatype.boolean(),
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
      console.log(error);
    }
  }

  // Create EventInvitations
  for (const letter of invitationLetterList) {
    const event = faker.helpers.arrayElement(eventList) as (typeof eventList)[0];
    try {
      await prisma.eventInvitation.create({
        data: {
          eid: event.eid,
          letter_id: letter.letter_id,
        },
      });
    } catch (error) {
      console.log(`EventInvitation already exists for event ${event.eid} and letter ${letter.letter_id}`);
      console.log(error);
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
      console.log(error);
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

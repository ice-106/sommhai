/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker/locale/en';
import { InviteRole, PrismaClient, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Users
  const users = await prisma.user.createMany({
    data: Array.from({ length: 10 }, () => ({
      uid: faker.string.uuid(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      payment_method: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Bank Transfer']),
      subscription_plan: faker.helpers.arrayElement(['Free', 'Basic', 'Premium']),
    })),
  });

  // Fetch created users
  const userList = await prisma.user.findMany();

  // Create Events
  const events = await prisma.event.createMany({
    data: userList.map((user: { username: any; uid: any }) => ({
      name: faker.lorem.words(3),
      date: faker.date.future(),
      time: faker.date.soon(),
      location: faker.location.city(),
      description: faker.lorem.sentence(),
      invite_list: faker.number.int({ min: 1, max: 99 }),
      memory: faker.lorem.sentence(),
      host: user.username,
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

  // Create Invites
  console.log('Creating invites...');
  for (const event of eventList) {
    // Find users who are not already attendees
    const existingAttendees = await prisma.attendee.findMany({
      where: { eid: event.eid },
      select: { uid: true },
    });

    const existingAttendeeIds = existingAttendees.map((a) => a.uid);
    const eligibleUsers = userList.filter((user) => !existingAttendeeIds.includes(user.uid));

    // Create attendee invites
    const usersToInvite = eligibleUsers.slice(0, 2);
    for (const user of usersToInvite) {
      try {
        await prisma.invite.create({
          data: {
            eventId: event.eid,
            userId: user.uid,
            role: InviteRole.ATTENDEE,
            accept: null, // pending
          },
        });
        console.log(`Created attendee invitation for user ${user.uid} to event ${event.eid}`);
      } catch (error) {
        console.log(`Error creating attendee invitation for user ${user.uid} to event ${event.eid}:`, error);
      }
    }

    // Find users who are not already organizers but are attendees
    const existingOrganizers = await prisma.organizer.findMany({
      where: { eid: event.eid },
      select: { uid: true },
    });

    const existingOrganizerIds = existingOrganizers.map((o) => o.uid);
    const eligibleAttendees = existingAttendees.filter((a) => !existingOrganizerIds.includes(a.uid));

    // Create organizer invites
    const attendeesToPromote = eligibleAttendees.slice(0, 2);
    for (const attendee of attendeesToPromote) {
      try {
        await prisma.invite.create({
          data: {
            eventId: event.eid,
            userId: attendee.uid,
            role: InviteRole.ORGANIZER,
            accept: null, // pending
          },
        });
        console.log(`Created organizer invitation for user ${attendee.uid} to event ${event.eid}`);
      } catch (error) {
        console.log(`Error creating organizer invitation for user ${attendee.uid} to event ${event.eid}:`, error);
      }
    }
  }

  // Create Event Questions
  console.log('Creating event questions...');
  for (const event of eventList) {
    const questionTypes = [QuestionType.SHORT_ANSWER, QuestionType.MULTIPLE_CHOICE, QuestionType.CHECKBOX];

    for (let i = 0; i < 3; i++) {
      const questionType = questionTypes[i % questionTypes.length];
      let options: string[] = [];

      if (questionType !== QuestionType.SHORT_ANSWER) {
        options = Array.from({ length: 4 }, () => faker.lorem.word());
      }

      try {
        await prisma.eventQuestion.create({
          data: {
            eventId: event.eid,
            question: faker.lorem.sentence() + '?',
            type: questionType,
            required: faker.datatype.boolean(),
            options: options,
          },
        });
      } catch (error) {
        console.log(`Error creating question for event ${event.eid}:`, error);
      }
    }
  }

  // Create Question Responses
  console.log('Creating question responses...');
  const questions = await prisma.eventQuestion.findMany();

  for (const question of questions) {
    // Get a random set of users to answer the question
    const respondents = faker.helpers.arrayElements(userList, faker.number.int({ min: 1, max: 3 }));

    for (const user of respondents) {
      try {
        let answer: string | null = null;

        switch (question.type) {
          case QuestionType.SHORT_ANSWER:
            answer = faker.lorem.sentence();
            break;
          case QuestionType.MULTIPLE_CHOICE:
            answer = question.options.length > 0 ? faker.helpers.arrayElement(question.options) : null;
            break;
          case QuestionType.CHECKBOX:
            answer =
              question.options.length > 0
                ? faker.helpers
                    .arrayElements(question.options, faker.number.int({ min: 1, max: question.options.length }))
                    .join(',')
                : null;
            break;
        }

        await prisma.questionResponse.create({
          data: {
            questionId: question.id,
            userId: user.uid,
            answer,
          },
        });
      } catch (error) {
        console.log(`Error creating response for question ${question.id} by user ${user.uid}:`, error);
      }
    }
  }

  // Create Leaderboards
  console.log('Creating leaderboards...');
  for (const event of eventList) {
    // Create leaderboard entries for a few random attendees
    const attendees = await prisma.attendee.findMany({
      where: { eid: event.eid },
      select: { uid: true },
    });

    for (const attendee of attendees.slice(0, 3)) {
      try {
        await prisma.leaderboard.create({
          data: {
            name: faker.lorem.words(2),
            uid: attendee.uid,
            eid: event.eid,
            score: faker.number.int({ min: 0, max: 1000 }),
          },
        });
      } catch (error) {
        console.log(`Error creating leaderboard entry for user ${attendee.uid} in event ${event.eid}:`, error);
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

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
      username: faker.internet.userName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      payment_method: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Bank Transfer']),
      subscription_plan: faker.helpers.arrayElement(['Free', 'Basic', 'Premium']),
      picture: faker.image.urlPicsumPhotos(),
    })),
    skipDuplicates: true,
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
      status: faker.helpers.arrayElement(['UPCOMING', 'ONGOING', 'COMPLETED']),
      message: faker.lorem.sentence(),
    })),
    skipDuplicates: true,
  });

  // Fetch created events
  const eventList = await prisma.event.findMany();

  // Create Event Questions for each event
  console.log('Creating event questions...');
  for (const event of eventList) {
    // Create a variety of question types for each event
    const questionData = [
      {
        eventId: event.eid,
        question: 'Do you have any dietary restrictions?',
        type: QuestionType.SHORT_ANSWER,
        required: true,
        options: [],
      },
      {
        eventId: event.eid,
        question: 'Will you need transportation?',
        type: QuestionType.MULTIPLE_CHOICE,
        required: true,
        options: ['Yes', 'No', 'Maybe'],
      },
      {
        eventId: event.eid,
        question: 'Which activities are you interested in?',
        type: QuestionType.CHECKBOX,
        required: false,
        options: ['Workshops', 'Keynotes', 'Networking', 'Social Events'],
      },
      {
        eventId: event.eid,
        question: 'Any additional comments or requests?',
        type: QuestionType.SHORT_ANSWER,
        required: false,
        options: [],
      },
    ];

    for (const question of questionData) {
      try {
        await prisma.eventQuestion.create({
          data: question,
        });
      } catch (error) {
        console.log(`Skipping duplicate question for event ${event.eid}`);
      }
    }
  }

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

  // Fetch all event questions for seeding responses
  const allQuestions = await prisma.eventQuestion.findMany();

  // Create Question Responses
  console.log('Creating question responses...');

  // For each event, have some users answer the questions
  for (const event of eventList) {
    // Get questions for this event
    const eventQuestions = allQuestions.filter((q) => q.eventId === event.eid);

    if (eventQuestions.length === 0) continue;

    // Get some attendees and some invitees to answer questions
    const attendees = await prisma.attendee.findMany({
      where: { eid: event.eid },
      select: { uid: true },
    });

    const invites = await prisma.invite.findMany({
      where: { eventId: event.eid },
      select: { userId: true },
    });

    const respondingUsers = [...attendees.map((a) => a.uid), ...invites.map((i) => i.userId)].slice(0, 5); // Limit to 5 users

    // Have each user answer some questions
    for (const userId of respondingUsers) {
      // Each user answers a random subset of questions
      const questionsToAnswer = faker.helpers.arrayElements(
        eventQuestions,
        faker.number.int({ min: 1, max: eventQuestions.length }),
      );

      for (const question of questionsToAnswer) {
        try {
          let answer: string | null = null;

          switch (question.type) {
            case QuestionType.SHORT_ANSWER:
              answer = faker.lorem.sentence();
              break;
            case QuestionType.MULTIPLE_CHOICE:
              if (question.options && question.options.length > 0) {
                answer = faker.helpers.arrayElement(question.options);
              }
              break;
            case QuestionType.CHECKBOX:
              if (question.options && question.options.length > 0) {
                const selectedOptions = faker.helpers.arrayElements(
                  question.options,
                  faker.number.int({ min: 1, max: question.options.length }),
                );
                answer = selectedOptions.join(',');
              }
              break;
          }

          if (answer) {
            // Check if a response already exists
            const existingResponse = await prisma.questionResponse.findUnique({
              where: {
                questionId_userId: {
                  questionId: question.id,
                  userId: userId,
                },
              },
            });

            if (existingResponse) {
              // Update existing response
              await prisma.questionResponse.update({
                where: {
                  id: existingResponse.id,
                },
                data: {
                  answer: answer,
                },
              });
            } else {
              // Create new response
              await prisma.questionResponse.create({
                data: {
                  questionId: question.id,
                  userId: userId,
                  answer: answer,
                },
              });
            }
          }
        } catch (error) {
          console.log(`Error creating/updating response for question ${question.id} by user ${userId}:`, error);
        }
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

import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // pnpm dlx prisma db seed

  // Create Users
  const users = await prisma.user.createMany({
    data: Array.from({ length: 5 }, () => ({
      uid: faker.string.uuid(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      dob: faker.date.birthdate(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      payment_method: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Bank Transfer']),
      subscription_plan: faker.helpers.arrayElement(['Free', 'Basic', 'Premium']),
    })),
  });

  // Fetch created users
  const userList = await prisma.user.findMany();

  // Create Events
  const events = await prisma.event.createMany({
    data: userList.map((user) => ({
      eid: faker.string.uuid(),
      name: faker.lorem.words(3),
      time: faker.date.anytime(),
      place: faker.location.city(),
      description: faker.lorem.sentence(),
      number_of_attendees: faker.number.int({ min: 1, max: 999 }),
      memory: faker.lorem.sentence(),
      feedbacks: faker.lorem.paragraph(),
      hostId: user.uid,
    })),
  });

  // Fetch created events
  const eventList = await prisma.event.findMany();

  // Create Attendees
  for (const event of eventList) {
    await prisma.attendee.create({
      data: {
        uid: faker.helpers.arrayElement(userList).uid,
        eid: event.eid,
      },
    });
  }

  // Create Organizers
  for (const event of eventList) {
    await prisma.organizer.create({
      data: {
        uid: faker.helpers.arrayElement(userList).uid,
        eid: event.eid,
      },
    });
  }

  // Create Media
  for (const event of eventList) {
    await prisma.media.create({
      data: {
        media_id: faker.string.uuid(),
        source: faker.image.urlPicsumPhotos(),
        taken_by_id: faker.helpers.arrayElement(userList).uid,
        eid: event.eid,
      },
    });
  }

  // Create Updates
  for (const event of eventList) {
    await prisma.updates.create({
      data: {
        log_id: faker.string.uuid(),
        message: faker.lorem.sentence(),
        acknowledge: faker.datatype.boolean(),
        date_of_message: faker.date.recent(),
        eid: event.eid,
      },
    });
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

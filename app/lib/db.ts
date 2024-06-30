import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// async function test() {
//   const token = await db.sMSToken.create({
//     data: {
//       token: '12342123',
//       user: {
//         connect: {
//           id: 3,
//         },
//       },
//     },
//   });

//   console.log(token);
// }

async function test() {
  const token = await db.sMSToken.findUnique({
    where: {
      id: 1,
    },
    include: {
      user: true,
    },
  });

  console.log(token);
}

test();

export default db;

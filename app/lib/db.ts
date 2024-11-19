import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// async function test() {
//   const token = await db.sMSToken.findUnique({
//     where: {
//       id: 1,
//     },
//     include: {
//       user: true,
//     },
//   });

//   console.log(token, 'token');
// }

// test();

// async function main() {
//   const post = await db.user.update({
//     where: { id: 6 },
//     data: { phone: '01011221233' },
//   });
//   console.log(post);
// }

// main()
//   .then(async () => {
//     await db.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await db.$disconnect();
//     process.exit(1);
//   });

export default db;

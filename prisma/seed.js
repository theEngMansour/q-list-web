
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        create: {
            email: 'theEngMasour@gmail.com',
            role: 'ADMIN'  
        }
    })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
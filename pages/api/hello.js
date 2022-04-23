// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async  function handler(req, res) {
  const { method } = req;

  switch(method){
 
      case 'GET':
        const user = await prisma.user.findMany({
          where: {
            role: 'ADMIN'
          }
        });
        return res.json({ user });
      break
      case 'POST':
        const s = await prisma.user.createMany({
          data: [
            { email: "ss@f",        image: "a", role: "USER" },
            { email: "mansour@com", image: "jpg", role: "USER" },
            { email: "mansourAden", image: "s", role: "USER" },
          ]
        });

        return res.json({ s });
      break
      default:
          res.status(400).json({success: false})
      break
  }


}
import prisma from 'lib/prisma';

const handler = async (req, res) => {
    const item = await prisma.tag.findUnique({
        where: {
          id: Number(req.query.id)
        },
        include: {
          posts: { select: { post: true } }
        }
    })
    res.status(200).json({
      // data import when need get data through query
        data: {
          item
        }
    })
}



export default handler


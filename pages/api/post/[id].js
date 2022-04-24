import prisma from 'lib/prisma';

const handler = async (req, res) => {
    const item = await prisma.post.findUnique({
        where: {
            id: Number(req.query.id),
        },
        include: {
            user: true,
            votePost: true,
            tags: {
                select: { 
                    tag: true 
                }
            },
            answers: {
                select: {
                    user: {
                        select: { name: true }
                    },
                    voteAnswer: true,
                    id: true,
                    content: true,
                    createdAt: true
                },
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    })
    res.status(200).json({
        data: {
            item
        }
    })
}



export default handler


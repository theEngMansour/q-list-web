
import prisma from 'lib/prisma';

const paginate = async ({ limit = 10, page = 1, sort = 'asc'}) => {
    const skip = limit * (page - 1)
    const items = await prisma.answer.findMany({
        include: {
            user: true,
            post: {
                select: {
                    tags: { select: { post: true, tag: true } }
                }
            }
        },
        take: limit,
        skip: skip,
        orderBy: {
            createdAt: sort
        }
    })

    const pages = Math.ceil(await prisma.post.count()/limit)
    return {
        items, pages
    }
} 


const handler = async (req, res) => {
    const {page, sort} = req.query;
    const {items, pages} = await paginate({page, sort})
    const a = items.map((e, index) => e)
/*     const [m] = a
    const [n] = m */

    res.status(200).json({
        a
    })

}

export default handler
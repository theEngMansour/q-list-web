
import prisma from 'lib/prisma';

const paginate = async ({ limit = 5, page = 1, sort = "asc"}) => {
    const skip = limit * (page - 1) // start from zero
    const items = await prisma.post.findMany({
        include: {
            user: true,
            answers: true,
            tags: {
                select: { tag: true }
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
    res.status(200).json({
        data: {
            items, pages, page
        }
    })

}

export default handler

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
const {id} = req.query
// Question
const question = await prisma.post.findUnique({
    where: {
        id: Number(id)
    },
    include: {
        user: true,
        tags: true,
        answers: true
    }
});

/**
 * Tags Question
 * question.tags = [{tagId, posId}] need remove array [] from question.tags
 * use remove array : const [tags] = question.tags
 * tags = {tagId, posId}
 * tagId = {tagId}
*/
const [tags] = question.tags;
const {tagId} = tags;
const tages = await prisma.tag.findMany({
    where: {
        id: tagId
    }
})

// Get Tags questionTags[0].name and use Map() frontEnd
const obj = Object.assign(question, tages)
const questionTags = {
    id:         obj.id,
    title:      obj.title,
    content:    obj.content,
    accepted:   obj.accepted,
    user: {
        name:   obj.user.name,
        email:  obj.user.email
    },
    tags: {
        name:         obj[0].name,
        slug:         obj[0].slug,
        description:  obj[0].description,
    },
    answers: obj.answers
}
export default handler
import prisma from 'lib/prisma';
import auth from 'utiles/auth'



const handler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(405).json({ method: 'don\'t the method POST' })  
    }
    const userId = req.user.id;
    const { title, content, tags } = req.body;
 
    const question = await prisma.post.create({
        data: {
            title,
            content,
            userId,
            tags: {
                createMany: {
                    data: tags
                    // data: [{tagId:1}, {tagId:1}] 
                }
            }

        }
    })
    res.status(201).json({
        data: {
            id: question.id
        }
    }) 
}

export default auth(handler)
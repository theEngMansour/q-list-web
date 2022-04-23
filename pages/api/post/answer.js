import prisma from 'lib/prisma';
import auth from 'utiles/auth'


const handler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(405).json({ method: 'don\'t the method POST' })  
    }
    const userId = req.user.id;
    const { content, postId } = req.body;
    await prisma.answer.create({
        data: {
            postId,
            content,
            userId,
        }
    }) 
    await prisma.answer.updateMany({
        data: {
            // answersCount: {// increment: 1}
            answersCount: 1
        },
        where: {
            postId
        }
    })
    res.status(201).json({success: 'added answer !'})
}

export default auth(handler)


import prisma from 'lib/prisma';
import auth from 'utiles/auth'

const handler = async (req, res) => {

    if(req.method !== 'POST') {
        return res.status(405).json({ method: 'don\'t the method POST' })  
    }


    if(req.body.postId){
        var data = {
            postId:         Number(req.body.postId), 
            userId:         Number(req.user.id), 
            user_post_id:   Number(req.body.postId + req.user.id), 
            type:           Number(req.body.type)
        }

        await prisma.votePost.upsert({
            where: {
                user_post_id: data.user_post_id
            },
            create: {
                ...data
            },
            update: {
                type: Number(data.type)
            }
        })
        
        res.status(201).json()
    }


    if(req.body.answerId){
        var data = {
            answerId:         Number(req.body.answerId), 
            userId:           Number(req.user.id), 
            user_answer_id:   Number(req.body.answerId + req.user.id), 
            type:             Number(req.body.type)
        }

        await prisma.voteAnswer.upsert({
            where: {
                user_answer_id: data.user_answer_id
            },
            create: {
                ...data
            },
            update: {
                type: Number(data.type)
            }
        })
        
        res.status(201).json()
    }


}

export default auth(handler)
/*

const handler = async (req, res) => {

    if(req.method !== 'POST') {
        return res.status(405).json({ method: 'don\'t the method POST' })  
    }

    const userId = req.user.id;

    if(req.body.postId){
        var data = {
            postId:   Number(req.body.postId), 
            type:     Number(req.body.type)
        }
        // var id = {
        //     postId: data.postId
        // }
    } else if(req.body.answerId) {

        var data = {
            answerId: Number(req.body.answerId), 
            type:     Number(req.body.type)
        } 
        // var id = {
        //     answerId: data.answerId
        // }
    }

    await prisma.vote.upsert({
        where: {
            userId: userId
        },
        create: {
            userId, 
            ...data
        },
        update: {
            type: Number(req.body.type)
        }
    })
    res.status(201).json()
}

export default auth(handler)
*/

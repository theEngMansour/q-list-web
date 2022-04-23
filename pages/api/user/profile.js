import auth from 'utiles/auth'
import prisma from 'lib/prisma';

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(400).json()
    const {name, email} = req.body;
    try {
        const id = req.user.id
        const user = await prisma.user.update({ 
            where: {
                id
            },
            data: {
                name, email
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

export default auth(handler)


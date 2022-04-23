import cookies from 'utiles/cookies';
import prisma from 'lib/prisma';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(400).json()
    }
    const { name, email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                name, email, password 
            }
        })
        .then(user => { 
            let token = jwt.sign({id: user.id}, "secret-key");
            res.cookie('accessToken', token, {httpOnly: true})
            res.status(200).json()
        })

    } catch (error) {
        res.status(400).json(error)
    }
}

export default cookies(handler)
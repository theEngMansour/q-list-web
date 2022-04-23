import cookies from 'utiles/cookies';
import prisma from 'lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
   
    if(req.method !== 'POST') {
        return res.status(400).json({ method: 'don\'t the method POST' })
    }
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: {email} })
        const comparePassword = () => {   
            return bcrypt.compareSync(password, user.password)
        }
        if(!comparePassword) {
            return res.status(400).json({ password: 'error in email or password' })
        }
       
        let token = jwt.sign({id: user.id}, "secret-key");
        res.cookie('accessToken', token, {httpOnly: true})
        res.status(200).json({ login: 'Login ! successfully', token})

    } catch (error) {
        res.status(400).json({error})
    }
}

export default cookies(handler)
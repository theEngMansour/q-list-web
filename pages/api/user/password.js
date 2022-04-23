import auth from 'utiles/auth';
import prisma from 'lib/prisma';

const handler = async (req, res) => {
    if (req.method !== 'POST') return res.status(400).json()
    const { password, newPassword} = req.body
    try {
        if(req.user.password === password) {
            const id = req.user.id
            const user = await prisma.user.update({ 
                where: {
                    id
                },
                data: {
                    password: newPassword
                }
            })
            res.status(200).json(user )
        } else {
            res.status(400).json({ password: 'error password !'})
        }
        
      
    } catch (error) {
        res.status(400).json(error)
    }
}
export default auth(handler)
import auth from 'utiles/auth'

const handler = (req, res) => {
    const { id, name, email } = req.user
    res.status(200).json({
        data: {
            id, name, email
        }
    })
}

export default auth(handler)







/* import jwt from 'jsonwebtoken';
import prisma from 'lib/prisma';
import cookies from 'utiles/cookies';

const handler = async (req, res) => {
    const decoded = jwt.verify(req.cookies?.accessToken,"secret-key", (err, decoded) => {
        if(err) throw new Error()
        req.user = {
            id: decoded.id,
        }}
    );
    try {
        const user = await prisma.user.findUnique({ where: req.user })
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({error})
    }
}

export default cookies(handler)
 */

import jwt from 'jsonwebtoken';
import prisma from 'lib/prisma';

async function check(req, res) {
    const decoded = jwt.verify(req.cookies?.accessToken,"secret-key", (err, decoded) => {
        if(err) throw new Error()
        req.user = {
            id: decoded.id,
        }}
    );
    try {
        const user = await prisma.user.findUnique({ where: req.user })
        if (user) return user
    } catch (error) {
        throw new Error()
    }
}

const auth = (handler) => async (req, res) => {
    try {
        req.user = await check(req, res)
        return handler(req, res)
    } catch (error) {
        res.status(401).json()
    }
}
export default auth
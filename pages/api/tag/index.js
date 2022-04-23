import prisma from 'lib/prisma';

const handler = async (req, res) => {
    switch (req.method) {
        case 'GET': 
            res.status(200).json({
                data: await prisma.tag.findMany()
            })
        break
        case 'POST':
            const { name, slug, description } = req.body;
            const tag = await prisma.tag.create({ 
                data: { 
                    name, slug, description 
                } 
            })
            res.status(201).json({
                data: tag
            }) 
        break
        default:
            res.status(405).json({ method: 'don\'t the method POST or GET'})
        break
    }
}

export default handler;
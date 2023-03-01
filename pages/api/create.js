import prisma from '../../lib/prisma'
// import NextCors from 'nextjs-cors'

const create = async (req, res) => {
	// const options = {
	// 	methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	// 	origin: '*',
	// 	optionsSuccessStatus: 200,
	// }
	// await NextCors(req, res, options)
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed!' })
	}
	const videoData = req.body
	const newVideo = await prisma.youtube_videos.create({
		data: videoData,
	})

	res.json(newVideo)
}

export default create

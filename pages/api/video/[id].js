import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
	const videoId = req.query.id
	if (req.method === 'DELETE') {
		const video = await prisma.youtube_videos.delete({
			where: { id: videoId },
		})
		res.status(200).json(video)
	} else if (req.method === 'PATCH') {
		const updatedVote = req.body.rating
		const video = await prisma.youtube_videos.update({
			where: { id: videoId },
			data: { rating: updatedVote },
		})
		res.status(200).json(video)
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		)
	}
}

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import styles from '../styles/votes.module.css'

const Votes = ({ video, videos, vote, rating, stateUpdater, updateVideo }) => {
	const voteUpdater = (videoObj, totalVote) => {
		let updatedVideo = { ...videoObj, rating: totalVote }
		let newData = [...videos]
		const i = newData.findIndex((video) => video.id === videoObj.id)
		newData[i] = updatedVideo
		const videoId = updatedVideo.id
		const updatedVote = updatedVideo.rating
		updateVideo(videoId, updatedVote)
		return stateUpdater(newData)
	}

	function kFormatter(num) {
		return Math.abs(num) > 999
			? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
			: Math.sign(num) * Math.abs(num)
	}

	function numberFormatter(number) {
		if (number < 1000) {
			return number
		} else if (number >= 1000 && number < 1_000_000) {
			return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
		} else if (number >= 1_000_000 && number < 1_000_000_000) {
			return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
		} else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
			return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'
		} else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
			return (number / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T'
		}
	}
	return (
		<div className={styles['votes-container']}>
			<ThumbUpAltIcon
				onClick={() => voteUpdater(video, rating + 1)}
				className={styles.like}
				fontSize='large'
				variant='contained'
			/>
			<p className={styles.votes}>{numberFormatter(vote)}&nbsp;&nbsp;|</p>
			&nbsp;&nbsp;
			<p className={styles.votes}></p>
			<ThumbDownAltIcon
				onClick={() => voteUpdater(video, rating - 1)}
				className={styles.dislike}
				fontSize='large'
				variant='contained'
			/>
		</div>
	)
}

export default Votes

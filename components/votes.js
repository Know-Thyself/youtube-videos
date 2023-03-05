import { useState, useEffect } from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import styles from '../styles/votes.module.css'

const Votes = ({
	video,
	videos,
	upvote,
	downvote,
	stateUpdater,
	upvoteVideo,
	downvoteVideo,
}) => {
	const [id, setId] = useState('')

	let identifier = videos.map((video) => ({ id: video.id, isLiked: false }))
	// const [isLiked, setIsLiked] = useState([])
	const [upvoted, setUpvoted] = useState({})
	const [downvoted, setDownvoted] = useState(false)
	const [likedVideos, setLikedVideos] = useState(identifier)

	// useEffect(() => {
	// 	localStorage.setItem('likes_tracker', JSON.stringify(likedVideos))
	// }, [likedVideos])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('likes_tracker') || '[]')
		setLikedVideos(data)
	}, [])

	useEffect(() => {
		if (id) {
			let someFix = likedVideos.map((vid) => {
				if (vid.id === id) {
					vid.isLiked = true
				}
				return vid
			})
			console.log(someFix, '<=====someFix')
			setLikedVideos(someFix)
			localStorage.setItem('likes_tracker', JSON.stringify(likedVideos))
		}
	}, [id])

	const upvoteUpdater = (videoObj, totalVote) => {
		let updatedVideo = { ...videoObj, upvote: totalVote }
		let newData = [...videos]
		const i = newData.findIndex((video) => video.id === videoObj.id)
		newData[i] = updatedVideo
		console.log(likedVideos, '<========= liked')
		const videoId = updatedVideo.id
		const updatedVote = updatedVideo.upvote
		upvoteVideo(videoId, updatedVote)
		return stateUpdater(newData)
	}

	const downvoteUpdater = (videoObj, totalVote) => {
		let updatedVideo = { ...videoObj, downvote: totalVote }
		let newData = [...videos]
		const i = newData.findIndex((video) => video.id === videoObj.id)
		newData[i] = updatedVideo
		const videoId = updatedVideo.id
		const updatedVote = updatedVideo.downvote
		setDownvoted(true)
		downvoteVideo(videoId, updatedVote)
		return stateUpdater(newData)
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

	function youtubeIdParser(url) {
		let regExp =
			/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
		let match = url.match(regExp)
		return match && match[2].length === 11 ? match[2] : false
	}

	return (
		<div className={styles['votes-container']}>
			<ThumbUpAltIcon
				onClick={(e) => {
					e.preventDefault()
					setId(video.id)
					upvoteUpdater(video, upvote + 1)
				}}
				className={
					likedVideos.filter((v) => v.id === video.id)[0].isLiked
						? styles.liked
						: styles.like
				}
				fontSize='large'
				variant='contained'
			/>
			<p className={styles.votes}>{numberFormatter(upvote)}&nbsp;&nbsp;|</p>
			&nbsp;&nbsp;
			<p className={styles.votes}>{downvote ? downvote : ''}</p>
			<ThumbDownAltIcon
				onClick={() => downvoteUpdater(video, downvote + 1)}
				className={downvoted ? styles.disliked : styles.dislike}
				fontSize='large'
				variant='contained'
			/>
		</div>
	)
}

export default Votes

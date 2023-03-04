import { useState, useEffect } from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import styles from '../styles/votes.module.css'
import qs from 'qs'
import { createBrowserHistory } from 'history'

const Votes = ({
	video,
	videos,
	upvote,
	downvote,
	stateUpdater,
	upvoteVideo,
	downvoteVideo,
}) => {
	const [url, setUrl] = useState('')
	const [isLiked, setIsLiked] = useState({})
	const [downvoted, setDownvoted] = useState(false)

	//TODO - implement local storage to make liked videos persist
	useEffect(() => {
		const data = window.localStorage.getItem('likes_tracker')
		if (data !== null) setIsLiked(JSON.parse(data))
	}, [])

	useEffect(() => {
		window.localStorage.setItem('likes_tracker', JSON.stringify(isLiked))
	}, [isLiked])

	useEffect(() => {
		let obj = {}
		if (url !== '') {
			obj[url] = true
			setIsLiked({...isLiked, ...obj})
		}
	}, [url])

	const upvoteUpdater = (videoObj, totalVote) => {
		let updatedVideo = { ...videoObj, upvote: totalVote }
		let newData = [...videos]
		const i = newData.findIndex((video) => video.id === videoObj.id)
		newData[i] = updatedVideo
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
					setUrl(video.url)
					upvoteUpdater(video, upvote + 1)
				}}
				className={isLiked[video.url] ? styles.clicked : styles.like}
				fontSize='large'
				variant='contained'
			/>
			<p className={styles.votes}>{numberFormatter(upvote)}&nbsp;&nbsp;|</p>
			&nbsp;&nbsp;
			<p className={styles.votes}>{downvote ? downvote : ''}</p>
			<ThumbDownAltIcon
				onClick={() => downvoteUpdater(video, downvote + 1)}
				className={downvoted ? styles.clicked : styles.dislike}
				fontSize='large'
				variant='contained'
			/>
		</div>
	)
}

export default Votes

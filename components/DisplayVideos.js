import React, { useState, useEffect } from 'react'
import EmbedVideo from './EmbedVideo'
import styles from '../styles/display.module.css'
import Header from './header'
import Votes from './votes'

const DisplayVideos = ({
	youtubeVideos,
	addVideo,
	deleteVideo,
	updateVideo,
}) => {
	const [videos, setVideos] = useState(youtubeVideos)
	const [backupVideos, setBackupVideos] = useState(youtubeVideos)
	// const [successAlert, setSuccessAlert] = useState(false)
	// const [errorAlert, setErrorAlert] = useState(false)
	// const [deleteAlert, setDeleteAlert] = useState(false)
	// const [open, setOpen] = useState(false)
	const [onlyChild, setOnlyChild] = useState(false)

	function youtubeIdParser(url) {
		// let regExp =
		// 	/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
		// let match = url.match(regExp)
		// return match && match[7].length === 11 ? match[7] : false
		let regExp =
			/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
		let match = url.match(regExp)
		return match && match[2].length === 11 ? match[2] : false
	}

	const ascendingOrder = () => {
		let tempArray = [...backupVideos]
		let sortedArray = tempArray.sort((a, b) => a.rating - b.rating)
		setVideos(sortedArray)
	}

	const descendingOrder = () => {
		let tempArray = [...backupVideos]
		let sortedArray = tempArray.sort((a, b) => b.rating - a.rating)
		setVideos(sortedArray)
	}

	const addNewVideo = (title, url, likes) => {
		const ids = videos.map((video) => video.id)
		if (ids.includes(youtubeIdParser(url).toString())) {
			setErrorAlert(true)
			setTimeout(() => {
				setErrorAlert(false)
			}, 5000)
		} else {
			let newArray = videos
			let newVideo = {
				id: youtubeIdParser(url).toString(),
				title: title,
				url: url,
				rating: parseInt(likes),
				posted: new Date().toString(),
			}
			addVideo(newVideo)
			newArray = [newVideo, ...newArray]
			setVideos(newArray)
			setSuccessAlert(true)
			const hideSuccessAlert = () => {
				setSuccessAlert(false)
			}
			setTimeout(hideSuccessAlert, 5000)
			return setVideos(newArray)
		}
	}

	const videoRemover = (id) => {
		deleteVideo(id)
		const remainingVideos = videos.filter((video) => video.id !== id)
		setVideos(remainingVideos)
		setDeleteAlert(true)
		const hideDeleteAlert = () => {
			setDeleteAlert(false)
		}
		setTimeout(hideDeleteAlert, 5000)
	}

	const stateUpdater = (updatedState) => {
		let newState = updatedState
		return setVideos(newState)
	}

	return (
		<div className={styles['container']}>
			<Header videos={videos} setVideos={setVideos} />
			<main className={styles['main-wrapper']}>
				{videos.map((video, index) => {
					const video_id = youtubeIdParser(video.url)
					return (
						<div key={index} className={styles['video-wrapper']}>
							{/* <Title title={video.title} /> */}
							<h4>{video.title}</h4>
							<EmbedVideo id={video_id} />
							<div className={styles['vote-and-delete']}>
								<Votes />
								{/* <Votes
								vote={video.rating}
								video={video}
								videos={videos}
								rating={video.rating}
								stateUpdater={stateUpdater}
								updateVideo={updateVideo}
							/>
							<DeleteButton
								id={video.id}
								videoRemover={videoRemover}
								title={video.title}
							/> */}
							</div>
						</div>
					)
				})}
			</main>
		</div>
	)
}

export default DisplayVideos

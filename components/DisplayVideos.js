import React, { useState, useEffect } from 'react'
import EmbedVideo from './EmbedVideo'
import PostVideoModal from './post'
import styles from '../styles/display.module.css'
import Header from './header'
import Votes from './votes'
import DeleteButton from './delete'
import Alert from 'react-bootstrap/Alert'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Button from '@mui/material/Button'
import Footer from './footer'

const DisplayVideos = ({
	youtubeVideos,
	addVideo,
	deleteVideo,
	upvoteVideo,
	downvoteVideo
}) => {
	const [videos, setVideos] = useState(youtubeVideos)
	const [backupVideos, setBackupVideos] = useState(youtubeVideos)
	const [successAlert, setSuccessAlert] = useState(false)
	const [errorAlert, setErrorAlert] = useState(false)
	const [deleteAlert, setDeleteAlert] = useState(false)
	const [open, setOpen] = useState(false)
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
				upvote: parseInt(likes),
				posted: new Date().toString(),
				downvote: 0,
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
			<div className={styles['App-header']}>
				<Header
					videos={backupVideos}
					setVideos={setVideos}
					setOnlyChild={setOnlyChild}
					stateUpdater={stateUpdater}
				/>
			</div>
			<div
				className={`${successAlert} ? ${styles['success-alert']} : ${styles['d-none']}`}
			>
				<Alert
					show={successAlert}
					variant='success'
					dismissible
					onClose={() => setSuccessAlert(false)}
				>
					Success! — Your video is successfully uploaded!
				</Alert>
			</div>
			<div
				className={`${errorAlert} ? ${styles['error-alert']} : ${styles['d-none']}`}
			>
				<Alert
					show={errorAlert}
					variant='danger'
					dismissible
					onClose={() => setErrorAlert(false)}
				>
					Error! — The video already exists! Try uploading another video.
				</Alert>
			</div>
			<div
				className={`${deleteAlert} ? ${styles['success-alert']} : ${styles['d-none']}`}
			>
				<Alert
					severity='success'
					className={`${deleteAlert} ? alert-success : ${styles['d-none']}`}
					onClose={() => setDeleteAlert(false)}
				>
					Success! — Your video is successfully deleted!
				</Alert>
			</div>
			<div
				className={
					onlyChild ? styles['d-none'] : styles['main-buttons-outer-container']
				}
			>
				<div className={styles['main-buttons']}>
					<div className={styles['asc-desc-order']}>
						<p className={styles['sort-by']}>Sort By Votes:&nbsp;</p>
						<Button
							className={styles['asc-btn']}
							onClick={ascendingOrder}
							variant='contained'
							color='primary'
						>
							Asc&nbsp;
							<ArrowUpwardIcon />
						</Button>
						<Button
							className={styles['desc-btn']}
							onClick={descendingOrder}
							variant='contained'
							color='primary'
						>
							Desc&nbsp;
							<ArrowDownwardIcon />
						</Button>
					</div>
					<PostVideoModal
						className={styles['add-btn']}
						addNewVideo={addNewVideo}
					/>
				</div>
			</div>
			<main
				className={onlyChild ? styles['only-child'] : styles['main-wrapper']}
			>
				{videos.map((video, index) => {
					const video_id = youtubeIdParser(video.url)
					return (
						<div key={index} className={styles['video-wrapper']}>
							{/* <Title title={video.title} /> */}
							<h3 className={styles['video-title']}>{video.title}</h3>
							<EmbedVideo id={video_id} />
							<div className={styles['vote-and-delete']}>
								<Votes
									upvote={video.upvote}
									downvote={video.downvote}
									video={video}
									videos={videos}
									stateUpdater={stateUpdater}
									upvoteVideo={upvoteVideo}
									downvoteVideo={downvoteVideo}
								/>
								<DeleteButton
									id={video.id}
									videoRemover={videoRemover}
									title={video.title}
								/>
							</div>
						</div>
					)
				})}
			</main>
		</div>
	)
}

export default DisplayVideos

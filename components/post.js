import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Modal from 'react-bootstrap/Modal'
import TextField from '@mui/material/TextField'
import AddToQueueIcon from '@mui/icons-material/AddToQueue'
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/modal.module.css'

const PostVideoModal = ({ addNewVideo }) => {
	const [showModal, setShowModal] = useState(false)
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [votes, setVotes] = useState(0)
	const [titleErrorAlert, setTitleErrorAlert] = useState(false)
	const [emptyUrlAlert, seEmptyUrlAlert] = useState(false)
	const [invalidUrlAlert, setInvalidUrlAlert] = useState(false)

	const cancelButtonHandler = () => {
		setShowModal(false)
		setTitleErrorAlert(false)
		seEmptyUrlAlert(false)
		setTitle('')
		setUrl('')
	}
	const handleShow = () => setShowModal(true)

	const submitNewVideo = (e) => {
		e.preventDefault()
		const regExp =
			/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
		const match = url.match(regExp)
		if (title === '' && showModal) {
			setTitleErrorAlert(true)
			const hideTitleErrorAlert = () => {
				setTitleErrorAlert(false)
			}
			setTimeout(hideTitleErrorAlert, 5000)
		} else if (url === '' && showModal) {
			seEmptyUrlAlert(true)
			setTimeout(() => {
				seEmptyUrlAlert(false)
			}, 5000)
		} else if (!match) {
			setInvalidUrlAlert(true)
			setTimeout(() => {
				setInvalidUrlAlert(false)
			}, 5000)
		} else if (title !== '' && url !== '' && match) {
			setTitle('')
			setUrl('')
			setVotes(0)
			addNewVideo(title, url, votes)
			setShowModal(false)
		}
	}

	return (
		<>
			<Button
				className={styles['add-button']}
				variant='contained'
				color='primary'
				onClick={handleShow}
			>
				Add Video&nbsp;
				<AddToQueueIcon />
			</Button>
			<Modal
				className={styles.modal}
				show={showModal}
				onHide={cancelButtonHandler}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Video Publisher Modal</Modal.Title>
				</Modal.Header>
				<Modal.Body className={styles['modal-fullscreen-lg-down modal-body']}>
					Please enter a title and a valid url of a YouTube video
					<Alert
						show={titleErrorAlert}
						dismissible
						variant='danger'
						onClose={() => setTitleErrorAlert(false)}
					>
						Failure! — Title field should not be empty!
					</Alert>
					<TextField
						className={styles['modal-content modal-text']}
						autoFocus
						margin='dense'
						required
						id='title'
						variant='outlined'
						label='Title'
						type='text'
						style={{ color: 'red' }}
						fullWidth
						onChange={(e) => {
							setTitleErrorAlert(false)
							setTitle(e.target.value)
						}}
						value={title}
					/>
					<Alert
						show={emptyUrlAlert}
						variant='danger'
						dismissible
						onClose={() => seEmptyUrlAlert(false)}
					>
						Failure! — URL field can not be empty!
					</Alert>
					<Alert
						show={invalidUrlAlert}
						variant='danger'
						dismissible
						onClose={() => setInvalidUrlAlert(false)}
					>
						Failure! — Invalid URL!
					</Alert>
					<TextField
						className={styles['modal-content modal-text']}
						required
						variant='outlined'
						margin='dense'
						id='url'
						label='URL'
						type='url'
						fullWidth
						onChange={(e) => {
							seEmptyUrlAlert(false)
							setUrl(e.target.value)
						}}
						value={url}
					/>
					<TextField
						className={styles['modal-content modal-text']}
						variant='outlined'
						margin='dense'
						id='votes'
						label='Number of likes'
						type='number'
						fullWidth
						onChange={(e) => {
							setVotes(e.target.value)
						}}
						value={votes}
					/>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles['upload-and-cancel-buttons']}>
						<Button
							type='cancel'
							className={styles['cancel-button']}
							variant='contained'
							color='inherit'
							onClick={cancelButtonHandler}
						>
							Cancel
						</Button>
						<Button
							onClick={submitNewVideo}
							type='submit'
							className={styles['submit-btn']}
							variant='contained'
							color='primary'
						>
							Publish
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default PostVideoModal

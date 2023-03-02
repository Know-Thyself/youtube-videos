import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCopyright } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/delete.module.css'

const DeleteButton = ({ id, videoRemover, title }) => {
	const [open, setOpen] = useState(false)

	const openDialogBox = () => {
		setOpen(true)
	}

	const cancelDelete = () => {
		setOpen(false)
	}

	return (
		<div className={styles['delete-button-container']}>
			<div>
				<Button
					variant='contained'
					color='secondary'
					className={styles['delete-button']}
					startIcon={<DeleteIcon />}
					onClick={openDialogBox}
				>
					Delete {/* Delete <FontAwesomeIcon icon={faTrash} /> */}
				</Button>
			</div>
			<Dialog
				open={open}
				onClose={cancelDelete}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle
					className={styles['alert-primary delete-dialog']}
					id='alert-dialog-title'
				>
					{'Are you sure you want to delete this video?'}
				</DialogTitle>
				<DialogContent className={styles['alert-primary dialog-content']}>
					<DialogContentText
						aria-labelledby='alert-dialog-title'
						id='alert-dialog-description'
					>
						The video: &apos;{title}&apos; will be permanently removed from our
						database. <br />
						Of course, you can add it later if you change your mind.
					</DialogContentText>
				</DialogContent>
				<DialogActions className={styles['alert-primary dialog-content']}>
					<Button onClick={cancelDelete} variant='outlined' color='primary'>
						Cancel
					</Button>
					<Button
						id={id}
						onClick={() => {
							videoRemover(id)
							setOpen(false)
						}}
						variant='outlined'
						color='secondary'
						startIcon={<DeleteIcon />}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default DeleteButton

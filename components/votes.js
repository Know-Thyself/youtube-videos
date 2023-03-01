import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import styles from '../styles/votes.module.css'

const Votes = () => {
  return (
		<div className={styles['icons-wrapper']}>
			<ThumbUpAltIcon className={styles.icon} />
			<ThumbDownAltIcon className={styles.icon} />
		</div>
	)
}

export default Votes
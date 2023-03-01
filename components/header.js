import styles from '../styles/header.module.css'
import SearchBar from './search'

const Header = ({ videos, setVideos }) => {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>YouTube Videos Recommendation</h1>
			<SearchBar className={styles.search} videos={videos} setVideos={setVideos} />
		</header>
	)
}

export default Header

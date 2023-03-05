import React, { useState } from 'react'
import styles from '../styles/search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ stateUpdater, videos, setIsOnlyChild }) => {
	const [searchInput, setSearchInput] = useState('')

	const handleSearchInput = (e) => {
		setSearchInput(e.target.value)
		const searchResult = videos.filter((video) =>
			video.title.toLowerCase().includes(searchInput.toLowerCase())
		)
		stateUpdater(searchResult)
		if (searchResult.length === 1) {
			setIsOnlyChild(true)
		}
		if (e.target.value === '') {
			stateUpdater(videos)
			setIsOnlyChild(false)
		}
	}

	return (
		<div key='input-form' className={styles['search-input-wrapper']}>
			<input
				key='search-input'
				type='text'
				className={styles['search-bar']}
				placeholder='Search for a video ...'
				value={searchInput}
				onChange={handleSearchInput}
				onFocus={(e) => (e.target.placeholder = '')}
				onPointerLeave={(e) =>
					(e.target.placeholder = 'Search for a video ...')
				}
			/>
			<FontAwesomeIcon
				icon={faMagnifyingGlass}
				className={`${styles.fas} ${styles['fa-search']}`}
			/>
		</div>
	)
}

export default SearchBar

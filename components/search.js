import React, { useState } from 'react'
import styles from '../styles/search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ stateUpdater, videos, setOnlyChild }) => {
	const [searchInput, setSearchInput] = useState('')

	const handleSearchInput = (e) => {
		setSearchInput(e.target.value.toLowerCase())
		const searchResult = videos.filter((video) =>
			video.title.toLowerCase().includes(searchInput)
		)
		stateUpdater(searchResult)
		if (searchResult.length === 1) {
			setOnlyChild(true)
		}
		if (e.target.value === '') {
			stateUpdater(videos)
			setOnlyChild(false)
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
			/>
			<FontAwesomeIcon
				icon={faMagnifyingGlass}
				className={`${styles.fas} ${styles['fa-search']}`}
			/>
		</div>
	)
}

export default SearchBar

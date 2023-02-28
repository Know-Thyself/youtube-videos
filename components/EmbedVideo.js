import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Home.module.css'

const EmbedVideo = ({ id }) => {
	return (
		<iframe
			className={styles['embedded-video']}
			width='560'
			height='215'
			src={`https://www.youtube.com/embed/${id}`}
			title='YouTube video player'
			frameBorder='0'
			allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
			allowFullScreen
		/>
	)
}

EmbedVideo.propTypes = {
	id: PropTypes.string.isRequired,
}

export default EmbedVideo

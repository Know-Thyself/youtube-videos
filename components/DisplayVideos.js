import React, { useState, useEffect } from 'react'
import EmbedVideo from './EmbedVideo'
import styles from '../styles/Home.module.css'

const DisplayVideos = ({ videosData }) => {
	const [videos, setVideos] = useState(videosData)
  function youtubeIdParser(url) {
		let regExp =
			/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
		let match = url.match(regExp)
		return match && match[7].length === 11 ? match[7] : false
	}

	return (
		<div>
			{videos.map((video, index) => {
					const video_id = youtubeIdParser(video.url)
					return (
						<div key={index} className={styles['video-and-details-wrapper']}>
							{/* <Title title={video.title} /> */}
							<h4>{video.title}</h4>
							<EmbedVideo id={video_id} />
							<div className={styles['vote-and-delete']}>
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
		</div>
	)
}

export default DisplayVideos
import React, { useState } from 'react'
import '../styles/globals.css'
//import Layout from '../components/layout'
import Head from 'next/head'
import DisplayVideos from '../components/DisplayVideos'

function MyApp({ Component, pageProps }) {
  return (
		<>
			<Head>
				<title>YouTube Videos</title>
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp

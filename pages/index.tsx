import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header";
import PostBox from '../components/PostBox';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Reddit</title>
        <link rel="icon" href="https://play-lh.googleusercontent.com/nlptFyxNsb8J0g8ZLux6016kunduV4jCxIrOJ7EEy-IobSN1RCDXAJ6DTGP81z7rr5Zq" />
      </Head>

        <div>
        {/*    Feed */}
            <PostBox />
        </div>

    </div>
  )
}

export default Home

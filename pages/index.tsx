import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header";
import PostBox from '../components/PostBox';
import Feed from "../components/Feed";
import {GET_SUBREDDITS_WITH_LIMIT} from "../graphql/queries";
import {useQuery} from "@apollo/client";
import SubredditRow from "../components/SubredditRow";

const Home: NextPage = () => {
    const {data} = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
        variables: {
            limit: 10
        }
    })

    const subreddits: Subreddit[] = data?.getSubredditListLimit;

  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <title>Reddit</title>
        <link rel="icon" href="https://play-lh.googleusercontent.com/nlptFyxNsb8J0g8ZLux6016kunduV4jCxIrOJ7EEy-IobSN1RCDXAJ6DTGP81z7rr5Zq" />
      </Head>

        <PostBox />
        <div className="flex">
            <Feed />

            <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
                <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
                <div>
                    {subreddits?.map((subreddit, index) =>  (
                        <SubredditRow key={index} topic={subreddit.topic} index={index} />
                    ))}
                </div>
            </div>
        {/*    Feed */}
        </div>

    </div>
  )
}

export default Home

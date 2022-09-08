import React from 'react';
import {useQuery} from "@apollo/client";
import {GET_ALL_POSTS} from "../graphql/queries";
import Post from './Post';

type Props = {
    topic?: string
}

const Feed = ({topic}: Props) => {
    const { data, error } = !topic ? useQuery(GET_ALL_POSTS) : useQuery();

    const posts: Post[] = data?.getPostList;
    return (
        <div className="mt-5 space-y-4">
            {posts?.map(post => (
                // @ts-ignore
                <Post key={post.id} post={post} />
                ))}
        </div>
    );
};

export default Feed;

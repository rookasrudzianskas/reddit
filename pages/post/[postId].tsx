import React from 'react';
import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import {GET_POST_BY_POST_ID} from "../../graphql/queries";
import Post from '../../components/Post';

const PostPage = () => {
    const router = useRouter();
    const { data } = useQuery(GET_POST_BY_POST_ID, {
        variables: {
            post_id: router.query.postId
        }
    });
    const post: Post = data?.getPostListByPostId;

    // console.log('This is the post');
    // console.log(post);
    // console.log('Above ----------------')

    return (
        <div>
            <Post post={post} />
        </div>
    );
};

export default PostPage;

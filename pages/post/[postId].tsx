import React from 'react';
import {useRouter} from "next/router";
import {useMutation, useQuery} from "@apollo/client";
import {GET_POST_BY_POST_ID} from "../../graphql/queries";
import Post from '../../components/Post';
import { useSession } from 'next-auth/react';
import {SubmitHandler, useForm} from "react-hook-form";
import {ADD_COMMENT} from "../../graphql/mutations";
import toast from "react-hot-toast";
import Avatar from '../../components/Avatar';
import TimeAgo from 'react-timeago'


type FormData = {
    comment: string
}

const PostPage = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [addComment] = useMutation(ADD_COMMENT, {
        refetchQueries: [GET_POST_BY_POST_ID, 'getPostListByPostId'],
    });
    const { data } = useQuery(GET_POST_BY_POST_ID, {
        variables: {
            post_id: router.query.postId
        }
    });
    const post: Post = data?.getPostListByPostId;

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        // post comment here
        // console.log(formData);
        const notification = toast.loading('Posting comment...');
        await addComment({
            variables: {
                post_id: router.query.postId,
                username: session?.user?.name,
                text: formData.comment
            }
        })

        setValue('comment', '');
        toast.success('Comment posted!', {
            id: notification
        });
    }

    // console.log(data)

    // console.log('This is the post');
    // console.log(post);
    // console.log('Above ----------------')

    return (
        <div className=" max-w-5xl mx-auto my-7">
            <Post post={post} />

            <div className="-mt-1 rounded-b-md border-t-0 border-gray-300 bg-white p-5 pl-16">
                <p className="text-sm">Comment as <span className="text-red-500">{session?.user?.name}</span></p>
                <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col space-y-2">
                    <textarea {...register('comment')} disabled={!session} placeholder={`${session ? 'What are your thoughts?' : 'Please Sign in to comment'}`} className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50" />
                    <button type="submit" className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200">Comment</button>
                </form>
            </div>

            <div className="-my-5 rounded-b-md border-t-0 border-gray-300 bg-white py-5 px-10">
                <hr className="py-2"/>
                {post?.comments.map(comment => (
                    <div className="relative flex items-center space-x-2 space-y-5" key={comment.id}>
                        <hr className="absolute top-10 h-16 border left-7 z-0"/>
                        <div className="z-50">
                            <Avatar seed={comment.username} />
                        </div>

                        <div className="flex flex-col">
                            <p className="py-2 text-xs text-gray-400">
                                <span className="font-semibold text-gray-600">{comment.username} </span>
                                • {" "}
                                <TimeAgo date={comment.created_at} />
                            </p>
                            <p className="">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostPage;

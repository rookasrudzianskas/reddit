import React, {useState} from 'react';
import {useSession} from "next-auth/react";
import Avatar from "./Avatar";
import {LinkIcon, PhotographIcon} from '@heroicons/react/outline';
import { useForm } from "react-hook-form";
import {useMutation, useQuery} from "@apollo/client";
import {ADD_POST, ADD_SUBREDDIT} from "../graphql/mutations";
import {GET_SUBREDDIT_BY_TOPIC} from "../graphql/queries";
import client from "../apollo-client";
import toast from "react-hot-toast";

const PostBox = () => {
    const {data: session} = useSession();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const [addPost] = useMutation(ADD_POST);
    const [addSubreddit] = useMutation(ADD_SUBREDDIT);

    const [imageBoxOpen, setImageBoxOpen] = useState(false);

    const onSubmit = handleSubmit(async (formData) => {
        console.log(formData, '<<<<<<<<<<<<<<');
        const notification = toast.loading('Creating a new post...')

        try {
            // query for subreddit
            const { data: { getSubredditListByTopic }, } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic: formData.subreddit
                }
            });

            const subredditExists = getSubredditListByTopic.length > 0;

            if(!subredditExists) {
                // create subreddit
                console.log('Subreddit is new! -> creating new subreddit!');
                const { data: { insertSubreddit: newSubreddit } } = await addSubreddit({
                    variables: {
                        topic: formData.subreddit
                    }
                })
                console.log('Creating the post...', formData);
                const image = formData.postImage || '';

                const { data: {insertPost: newPost }, } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: newSubreddit.id,
                        title: formData.postTitle,
                        username: session?.user?.name,
                    },
                })

                console.log('New post created!', newPost);

            } else {
                // use existing subreddit
                console.log('Subreddit exists! -> using existing subreddit!');
                console.log(getSubredditListByTopic);

                const image = formData.postImage || '';
                const {data: { insertPost: newPost }} = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: getSubredditListByTopic[0].id,
                        title: formData.postTitle,
                        username: session?.user?.name,
                    }
                });

                console.log('New post created!', newPost);
            }
            // After the post added, clear the form
            setValue('postBody', '');
            setValue('postTitle', '');
            setValue('postImage', '');
            setValue('subreddit', '');
            toast.success('Post created successfully!', {id: notification});

        } catch (e) {
            toast.error('Whoops, something went wrong', {id: notification});
        }
    });


    return (
        <form onSubmit={onSubmit} className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2">
            <div className="flex items-center space-x-3">
                <Avatar />
            {/*    avatar   */}
                <input {...register('postTitle', {required: true})}
                    disabled={!session} className="rounded-md flex-1 bg-gray-50 p-2 pl-5 outline-none" type="text" placeholder={session ? 'Create a post by entering a title!' : 'Sign in to post'} />

                <PhotographIcon onClick={() => setImageBoxOpen(!imageBoxOpen)} className={`h-6 text-gray-300 hover:cursor-pointer ${imageBoxOpen && 'text-blue-500'}`} />
                <LinkIcon className={`h-6 text-gray-300 hover:cursor-pointer`} />
            </div>
            {!!watch('postTitle') && (
                <div className="flex flex-col py-2">
                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Body</p>
                        <input className="m-2 flex-1 bg-blue-50 p-2 outline-none" {...register('postBody')} type="text" placeholder={'Text (optional)'}/>
                    </div>

                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Subreddit:</p>
                        <input className="m-2 flex-1 bg-blue-50 p-2 outline-none" {...register('subreddit', {required: true})} type="text" placeholder={'i.e. reactjs'}/>
                    </div>

                    {imageBoxOpen && (
                        <div className="flex items-center px-2">
                            <p className="min-w-[90px]">Image URL:</p>
                            <input className="m-2 flex-1 bg-blue-50 p-2 outline-none" {...register('postImage')} type="text" placeholder={'Optional...'}/>
                        </div>
                    )}

                    {Object.keys(errors).length > 0 && (
                        <div className="space-y-2 p-2 text-red-500 text-xs">
                            {errors.postTitle?.type === 'required' && (
                                <p>- A Post Title is required</p>
                            )}
                            {errors.subreddit?.type === 'required' && (
                                <p>- A Post Subreddit is required</p>
                            )}
                        </div>
                    )}

                    {!!watch('postTitle') && (
                        <button type="submit" className="w-full rounded-full bg-blue-400 p-2 text-white">Create Post</button>
                        )}

                </div>
            )}
        </form>
    );
};

export default PostBox;

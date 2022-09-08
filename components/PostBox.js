import React, {useState} from 'react';
import {useSession} from "next-auth/react";
import Avatar from "./Avatar";
import {LinkIcon, PhotographIcon} from '@heroicons/react/outline';
import { useForm } from "react-hook-form";

const PostBox = () => {
    const {data: session} = useSession();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [imageBoxOpen, setImageBoxOpen] = useState(false);

    return (
        <form className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2">
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
                        <input className="m-2 flex-1 bg-blue-50 p-2 outline-none" {...register('subreddit')} type="text" placeholder={'i.e. reactjs'}/>
                    </div>

                    {imageBoxOpen && (
                        <div className="flex items-center px-2">
                            <p className="min-w-[90px]">Image URL:</p>
                            <input className="m-2 flex-1 bg-blue-50 p-2 outline-none" {...register('postImage')} type="text" placeholder={'Optional...'}/>
                        </div>
                    )}
                </div>
            )}
        </form>
    );
};

export default PostBox;

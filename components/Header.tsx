import React from 'react';
import Image from "next/image";
// @ts-ignore
import {BeakerIcon, MenuIcon} from '@heroicons/react/solid';
// @ts-ignore
import {StarIcon} from '@heroicons/react/outline';
// @ts-ignore
import {BellIcon, ChatIcon, GlobeIcon, PlusIcon, SparklesIcon, SpeakerphoneIcon, VideoCameraIcon} from '@heroicons/react/outline';
import {ChevronDownIcon, HomeIcon} from "@heroicons/react/solid";
import SearchIcon from '@mui/icons-material/Search';
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Link from 'next/link';

const Header = () => {
    const {data: session} = useSession();
    const router = useRouter();

    return (
        <div className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-sm">
            <div className="relative h-10 w-20 flex-shrink-0 hover:cursor-pointer">
                <Link href={'/'}>
                    <Image
                        // className="object-contain"
                        objectFit={'contain'}
                        src={'data:image/png;base64,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'} layout={'fill'} />

                </Link>
            </div>
            <div className="flex items-center mx-7 xl:min-w-[300px]">
                <HomeIcon className="h-5 w-5" />
                <p className="flex-1 ml-2 hidden lg:inline">Home</p>
                <ChevronDownIcon className="h-5 w-5" />
            </div>
        {/*    search */}
            <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
                <SearchIcon className="text-gray-400" />
                <input type="text" className="flex-1 bg-transparent outline-none" placeholder={'Search Reddit'}/>
                <button type="submit" hidden></button>
            </form>

            <div className="hidden flex text-gray-500 space-x-2 items-center lg:inline-flex mx-5">
                <SparklesIcon className="icon" />
                <GlobeIcon className="icon" />
                <VideoCameraIcon className="icon" />
                <hr className="h-10 border border-gray-100"/>
                <ChatIcon className="icon" />
                <BellIcon className="icon" />
                <PlusIcon className="icon" />
                <SpeakerphoneIcon className="icon" />
            </div>

            <div className="ml-5 flex items-center lg:hidden">
                <MenuIcon className="icon" />
            </div>

            {session ? (
                <div onClick={() => signOut()} className="hidden lg:flex items-center border border-gray-100 p-2 hover:cursor-pointer space-x-2">
                    <div className="relative w-5 h-5 flex-shrink-0">
                        <Image src="https://links.papareact.com/23l" layout={'fill'} objectFit={'contain'} alt=""/>
                    </div>
                    {/* sign in option */}
                    <div className="flex-1 text-xs">
                        <p className="truncate">{session?.user?.name}</p>
                        <p className="text-gray-400">1 Karma</p>
                    </div>
                    <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
                </div>
            ) : (
                <div onClick={() => signIn()} className="hidden lg:flex items-center border border-gray-100 p-2 hover:cursor-pointer space-x-2">
                    <div className="relative w-5 h-5 flex-shrink-0">
                        <Image src="https://links.papareact.com/23l" layout={'fill'} objectFit={'contain'} alt=""/>
                    </div>
                    {/* sign in option */}
                    <p className="text-gray-400">Sign in</p>
                </div>
            )}

        </div>
    );
};

export default Header;

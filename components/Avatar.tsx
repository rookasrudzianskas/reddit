import React from 'react';
import {useSession} from "next-auth/react";
import Image from "next/image";

type Props = {
    seed?: string;
    large?: boolean;
}

const Avatar = ({seed, large}: Props) => {
    const {data: session} = useSession();
    return (
       // @ts-ignore
       <div className={`relative w-10 h-10 overflow-hidden rounded-full border-gray-300 bg-white object-contain ${large && 'h-20 w-20'}`}>
           {/*@ts-ignore */}
           <Image objectFit={'contain'} src={`https://avatars.dicebear.com/api/bottts/${seed || session?.user.name || 'placeholder'}.svg`} layout={'fill'} />
       </div>
    );
};

export default Avatar;

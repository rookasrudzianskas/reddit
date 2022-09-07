import React from 'react';
import {useSession} from "next-auth/react";
import Image from "next/image";

const Avatar = () => {
    const {data: session} = useSession();
    return (
       <div className="relative w-10 h-10 rounded-full border-gray-300 bg-white object-contain">
           <Image objectFit={'contain'} src={`https://avatars.dicebear.com/api/bottts/${session?.user.name || 'placeholder'}.svg`} layout={'fill'} />
       </div>
    );
};

export default Avatar;

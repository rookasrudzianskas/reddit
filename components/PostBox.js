import React from 'react';
import {useSession} from "next-auth/react";

const PostBox = () => {
    const {data: session} = useSession();
    return (
        <form>
            <div>
            {/*    avatar   */}
                <input type="text"/>
            </div>
        </form>
    );
};

export default PostBox;

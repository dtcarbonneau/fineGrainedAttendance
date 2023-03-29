"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import List from './MhsClassList';
import GoogleButton from 'react-google-button';
//import { UserInformation } from "./user-information";

export default function Component() {
    const { data: session } = useSession();
        if (session) {
            return (
                <>
                    Signed in as {session.user.name} <br />
                    <GoogleButton label="Sign Out" onClick={() => signOut()}> Sign out </GoogleButton>
                </>
            )
        }
    return (
        <>
            Not signed in <br />
            <GoogleButton onClick={() => signIn()}>Sign In</GoogleButton>
        </>
    );
}

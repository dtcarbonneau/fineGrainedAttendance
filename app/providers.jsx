"use client";

import { SessionProvider } from "next-auth/react";
import { MhsClassProvider } from "./contexts/globalContext";

export default function Providers({ children }) {
    return <SessionProvider><MhsClassProvider>
        {children}</MhsClassProvider></SessionProvider>
}
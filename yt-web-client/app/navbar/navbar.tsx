// navbar.tsx
'use client';  // This marks this file as a Client Component

import Image from "next/image"; // React Image element
import Link from "next/link";
import styles from "./navbar.module.css";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Upload from "./upload";

export default function Navbar() {
    // Initialize user state and continueButton state
    const [user, setUser] = useState<User | null>(null);
    const [continueButton, setContinueButton] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });

        // Stop watching authentication state when the component unmounts
        return () => unsubscribe();
    }, []); // Add empty dependency array so it only runs once

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image width={90} height={20} src="/youtube-logo.svg" alt="YouTube Logo" />
            </Link>

            {user && continueButton && <Upload />}  
           
            <SignIn user={user} setContinueButton={setContinueButton} />
        </nav>
    );
}

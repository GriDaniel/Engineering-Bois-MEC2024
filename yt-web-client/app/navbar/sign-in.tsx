'use client';  // Required for client-side rendering in Next.js 13+

import { Fragment, useState } from 'react';
import { signInWithGoogle, signOut } from '../firebase/firebase'; // Firebase functions
import styles from './sign-in.module.css';
import { User } from 'firebase/auth'; // Firebase User type


interface SignInProps {
    user: User | null; // TypeScript interface for user
    setContinueButton: (value: boolean) => void;
}

const SignIn: React.FC<SignInProps> = ({ user, setContinueButton }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [showOtp, setShowOtp] = useState(false); // State to show OTP form
    const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // OTP state
    const handleSignIn = async () => {
        await signInWithGoogle();
        setIsSignedIn(true);
        setTimeout(() => {
            setShowOtp(true);

        }, 1000); // 1000ms = 1 second delay
    };

    const handleSignOut = () => {
        signOut();
        setIsSignedIn(false);
        setShowOtp(false); // Hide OTP form on sign-out
        setContinueButton(false);
        setOtp(new Array(6).fill(''));

    };


    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (value === "" || /^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                document.getElementById(`otp-input-${index + 1}`)?.focus();
            }
        }
    };

    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index]) {
            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`)?.focus();
            }
        }
    };

    return (
        <Fragment>
            {user ? (
                <div>
                    <button className={styles.signin} onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            ) : (
                <div>
                    <button className={styles.signin} onClick={handleSignIn}>
                        Sign In
                    </button>

                </div>
            )}
            {showOtp && (  // Render this block only if `show` is true
                <div className={styles.otpcontainer}>
                    <div className={styles.innerContainer}>
                        <div className={styles.title}>Verify Your Identity</div>
                        <div className={styles.description}>
                            Check your email ****s@gmail.com for a sent verification code.
                        </div>

                        <div className={styles.otpInputsContainer}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                    maxLength={1}
                                    className={styles.otpInput}
                                    inputMode="numeric"
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        <button className={styles.continueButton} onClick={() => {
                            setContinueButton(true);
                            setShowOtp(false);
                        }}> Continue</button>
                    </div>
                </div>




            )
            }
        </Fragment >
    );
};

export default SignIn;

import React from 'react'
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import img1 from "../images/H1.png"

const Otpauth = () => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const Navigator = useNavigate();

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }
      }
    
      function onSignup() {
        setLoading(true);
        onCaptchVerify();
    
        const appVerifier = window.recaptchaVerifier;
    
        const formatPh = "+" + ph;
    
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            setShowOTP(true);
            toast.success("OTP sended successfully!");
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }
    
      function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
          .confirm(otp)
          .then(async (res) => {
              console.log(res);
              localStorage.setItem('mobile', res.user.phoneNumber);
              setLoading(false);
              Navigator('/home');
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }


      // bg-emerald-500

  return (
    <section className="bg-orange-300 flex items-center justify-center h-screen">
        <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-bold text-5xl mb-6">
              Welcome to <br /> Hawker's
            </h1>
            <img src={img1} className='absolute right-12 h-[425px] w-84' alt='img'/>
            {showOTP ? (
              <>
                <div className="bg-white text-orange-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-orange-400 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-orange-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-orange-400 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
          </div>
          </section>
        )
}

export default Otpauth

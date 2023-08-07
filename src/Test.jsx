import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import OtpInput from "otp-input-react";
import "react-phone-input-2/lib/style.css";

import { Toaster, toast } from "react-hot-toast";

import "./App.css";
import { useState } from "react";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "firebase/auth";
import { auth } from "./firebase";

function Test() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [ph, setPh] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    console.log("Entering onCaptchVerify");
    if (!window.recaptchaVerifier) {
      console.log("Creating new RecaptchaVerifier");
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container", // Make sure this ID matches your HTML container
        {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha callback response:", response);
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth // Use the initialized Firebase app here
      );
    }
  }

  function onSignup() {
    console.log("Entering onSignup");
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        console.log(formatPh)

        toast.success("OTP sent successfully!");
        console.log("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(formatPh)
        console.log("appVerifierappVerifierappVerifierappVerifierappVerifier",appVerifier)

        console.error("Error sending OTP:", error);
        setLoading(false);
      });

  }

  function onOTPVerify() {
    console.log("Entering onOTPVerify");
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log("OTP verification successful:", res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error verifying OTP:", err);
        setLoading(false);
      });
  }

  function onResendOTP() {
    setLoading(true);
    clearRecaptchaVerifier(); // Clear the existing recaptchaVerifier
  
    onCaptchVerify(); // Reinitialize the reCAPTCHA verifier
  
    const appVerifier = window.recaptchaVerifier;
  
    const formatPh = "+" + ph;
  
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true); // Show the OTP inputs after resending OTP
        toast.success("OTP sent successfully!");
        console.log("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        setLoading(false);
  
        // Reset the reCAPTCHA to allow the user to try again
        if (window.recaptchaVerifier && window.recaptchaVerifier.reset) {
          window.recaptchaVerifier.reset(); // Reset the reCAPTCHA widget
        }
      });
  }


  return (
    <>
      <div></div>
      <h1>Otp Demo</h1>
      <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
      {user ? (
        <h2 className="text-center text-white font-medium text-2xl">
          👍Login Success
        </h2>
      ) : (
        <div>
          {showOTP ? (
            <div style={{ textAlign: "center" }}>
              <div>
                <BsFillShieldLockFill
                  style={{
                    backgroundColor: "#ffffff",
                    padding: 10,
                    borderRadius: "100%",
                    color: "#679B9B",
                  }}
                  size={30}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#ffffee",
                  }}
                >
                  Enter the OTP
                </label>
              </div>
              <div>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                  style={{
                    margin: "10px 2px",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                  }}
                ></OtpInput>
              </div>
              <button
                onClick={onOTPVerify}
                disabled={loading ? true : false}>
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}{" "}
                Verify OTP
              </button>

              <button
                onClick={onResendOTP}
                disabled={loading ? true : false}>
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}{" "}
                Send OTP Again
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div>
                <BsTelephoneFill
                  style={{
                    backgroundColor: "#ffffff",
                    padding: 10,
                    borderRadius: "100%",
                    color: "#679B9B",
                  }}
                  size={30}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#ffffee",
                  }}
                >
                  Verify your phone number
                </label>
              </div>
              <div style={{ margin: "10px 0" }}>
                <PhoneInput country={"dz"} value={ph} onChange={setPh} />
              </div>
              <button
                onClick={onSignup}
                disabled={loading ? true : false}>
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}{" "}
                Send code via SMS
              </button>
            </div>
          )}
        </div>
      )}

    </>
  );
}

export default Test;

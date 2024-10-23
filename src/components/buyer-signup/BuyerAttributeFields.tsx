import React from "react";
import Image from "next/image";

const SignUpForm = () => {
  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600";

  return (
    <div className="flex flex-col-reverse md:flex-row w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-rawmats-secondary-700 overflow-hidden">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">SIGN UP NOW!</h1>
        <p className="text-gray-500 mb-8">Login to your account!</p>

        <div className="space-y-5">
          <div>
            <input type="text" placeholder="Name" className={inputStyle} />
          </div>

          <div>
            <input type="email" placeholder="Email" className={inputStyle} />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className={inputStyle}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className={inputStyle}
            />
          </div>

          <button className="w-full bg-indigo-900 text-white py-3 rounded-lg font-semibold">
            Login
          </button>

          <p className="text-gray-400 text-sm mt-4">Log in here.</p>

          <div className="text-center text-gray-500 my-4">OR</div>

          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Login with Google
          </button>
        </div>
      </div>

      {/* Right side - Logo */}
      <div className="w-full md:w-1/2 bg-sky-100 flex items-center justify-center p-10">
        <div className="flex flex-col items-center">
          <Image
            src="/RawmatsLogo.png" // Ensure this path is correct
            alt="Rawmats Logo"
            width={200}
            height={200}
            className="object-contain"
          />
          <div className="text-center mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

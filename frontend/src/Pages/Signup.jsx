import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ({ togglePopup }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [businessType, setBusinessType] = useState("Enterprises");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-black/40 via-gray-800/30 to-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.1 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg"
      >
        {/* Close Button */}
        <button
          onClick={togglePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✖
        </button>

        <h2 className="text-3xl font-bold text-center mb-2">Sign Up</h2>
        <p className="text-gray-600 text-center mb-4">Please fill in this form to create an account!</p>

        <form className="space-y-4">
          <div className="flex space-x-4">
            <input type="text" placeholder="First Name" className="w-1/2 p-2 border rounded" />
            <input type="text" placeholder="Last Name" className="w-1/2 p-2 border rounded" />
          </div>
          <input type="text" placeholder="Username" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
          <input type="text" placeholder="Contact Number" className="w-full p-2 border rounded" />

          {/* Password Field */}
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 border rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-2 border rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {confirmPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <p className="text-gray-600">Address</p>
          <div className="flex space-x-2">
            <input type="text" placeholder="Street Line 1" className="w-1/3 p-2 border rounded" />
            <input type="text" placeholder="Street Line 2" className="w-1/3 p-2 border rounded" />
            <input type="text" placeholder="City" className="w-1/3 p-2 border rounded" />
          </div>

          <p className="text-gray-600">Do You Have a Business or Industry?</p>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`p-2 w-1/2 rounded ${businessType === "Enterprises" ? "bg-blue-900 text-white" : "bg-gray-200"}`}
              onClick={() => setBusinessType("Enterprises")}
            >
              Enterprises
            </button>
            <button
              type="button"
              className={`p-2 w-1/2 rounded ${businessType === "Industry" ? "bg-blue-900 text-white" : "bg-gray-200"}`}
              onClick={() => setBusinessType("Industry")}
            >
              Industry
            </button>
          </div>

          {businessType === "Enterprises" && (
            <>
              <p className="text-gray-600 font-semibold">Enterprise Details</p>
              <input type="text" placeholder="Enterprise Name" className="w-full p-2 border rounded" />
              <input type="text" placeholder="Enterprise Type" className="w-full p-2 border rounded" />
              <input type="email" placeholder="Enterprise Email" className="w-full p-2 border rounded" />
              <input type="text" placeholder="Contact Number" className="w-full p-2 border rounded" />
            </>
          )}

          {businessType === "Industry" && (
            <>
              <p className="text-gray-600 font-semibold">Industry Details</p>
              <input type="text" placeholder="Industry Name" className="w-full p-2 border rounded" />
              <input type="text" placeholder="Industry Type" className="w-full p-2 border rounded" />
              <input type="email" placeholder="Industry Email" className="w-full p-2 border rounded" />
              <input type="text" placeholder="Industry Contact Number" className="w-full p-2 border rounded" />
            </>
          )}

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="w-4 h-4" />
            <label htmlFor="terms" className="text-gray-600">
              I accept the <span className="text-blue-600 cursor-pointer">Terms of Use & Privacy Policy</span>.
            </label>
          </div>

          <button className="w-full bg-blue-900 text-white py-3 rounded text-lg font-bold">Sign Up</button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account? <span className="text-blue-600 cursor-pointer">Log in here.</span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;

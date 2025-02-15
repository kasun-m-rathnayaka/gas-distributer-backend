import {useState} from "react";
import {motion} from "framer-motion";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

// eslint-disable-next-line react/prop-types
const Signup = ({togglePopup}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        contactNumber: '',
        password: '',
        confirmPassword: '',
        streetLine1: '',
        streetLine2: '',
        city: ''
    });

    const handleSignUp = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:3001/api/v1/auth/sign-up', {formData});
            toast.success('User created successfully');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-black/40 via-gray-800/30 to-black/40 backdrop-blur-sm">
            <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.1}}
                transition={{duration: 0.2}}
                className="relative w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg"
            >
                <ToastContainer/>
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
                        <input type="text" placeholder="First Name" className="w-1/2 p-2 border rounded"
                               onChange={e => setFormData({...formData, firstname: e.target.value})}/>
                        <input type="text" placeholder="Last Name" className="w-1/2 p-2 border rounded"
                               onChange={e => setFormData({...formData, lastname: e.target.value})}/>
                    </div>
                    <input type="text" placeholder="Username" className="w-full p-2 border rounded"
                           onChange={e => setFormData({...formData, username: e.target.value})}/>
                    <input type="email" placeholder="Email" className="w-full p-2 border rounded"
                           onChange={e => setFormData({...formData, email: e.target.value})}/>
                    <input type="text" placeholder="Contact Number" className="w-full p-2 border rounded"
                           onChange={e => setFormData({...formData, contactNumber: e.target.value})}/>

                    {/* Password Field */}
                    <div className="relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            className="w-full p-2 border rounded pr-10"
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                        >
                            {passwordVisible ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
                        </button>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative">
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full p-2 border rounded pr-10"
                            onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                        />
                        <button
                            type="button"
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                        >
                            {confirmPasswordVisible ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
                        </button>
                    </div>

                    <p className="text-gray-600">Address</p>
                    <div className="flex space-x-2">
                        <input type="text" placeholder="Street Line 1" className="w-1/3 p-2 border rounded"
                               onChange={e => setFormData({...formData, streetLine1: e.target.value})}/>
                        <input type="text" placeholder="Street Line 2" className="w-1/3 p-2 border rounded"
                               onChange={e => setFormData({...formData, streetLine2: e.target.value})}/>
                        <input type="text" placeholder="City" className="w-1/3 p-2 border rounded"
                               onChange={e => setFormData({...formData, city: e.target.value})}/>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="terms" className="w-4 h-4"/>
                        <label htmlFor="terms" className="text-gray-600">
                            I accept the <span
                            className="text-blue-600 cursor-pointer">Terms of Use & Privacy Policy</span>.
                        </label>
                    </div>

                    <button className="w-full bg-blue-900 text-white py-3 rounded text-lg font-bold"
                            onClick={handleSignUp}>Sign Up
                    </button>

                    <p className="text-center text-gray-600 mt-4">
                        Already have an account? <span className="text-blue-600 cursor-pointer">Log in here.</span>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;
import {useContext, useState} from "react";
import {motion} from "framer-motion";
import {FaGoogle, FaGithub, FaFacebook, FaEye, FaEyeSlash} from "react-icons/fa";
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";
import {authcontext} from "../../context/authcontext.jsx";

// eslint-disable-next-line react/prop-types
const Login = ({togglePopup }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const navigate = useNavigate();
    const {setIsLoggedIn, setUserRole} = useContext(authcontext);

    const handleLogin = (e) => {
        e.preventDefault();

        try {
            axios.post("http://localhost:3001/api/v1/auth/sign-in", {username, password})
                .then((res) => {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    setIsLoggedIn(true);
                    setUserRole(res.data.data.role || "user");
                })
        } catch (error) {
            toast.error("Invalid Credentials"+error);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-black/40 via-gray-800/30 to-black/40 backdrop-blur-sm">
            <ToastContainer/>
            <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.1}}
                transition={{duration: 0.2}}
                className="relative w-96 p-8 bg-white rounded-lg shadow-lg"
            >
                <button onClick={togglePopup}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer">✖
                </button>

                <div className="text-center">
                    <img src="/logo.png" alt="GasByGas Logo" className="w-20 mx-auto mb-4"/>
                    <h2 className="text-xl font-bold mb-4">Login</h2>
                </div>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            className="w-full p-2 border rounded pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                        >
                            {passwordVisible ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
                        </button>
                    </div>
                    <p className="text-blue-600 text-sm text-right cursor-pointer">Forgot Password?</p>
                    <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded">Sign In</button>
                </form>

                <p className="text-center mt-4 text-gray-600">Or continue with</p>

                <div className="flex justify-center space-x-4 mt-2">
                    <button className="p-2 bg-gray-200 rounded flex items-center gap-2 px-4">
                        <FaGoogle size={20} className="text-red-500"/>
                    </button>
                    <button className="p-2 bg-gray-200 rounded flex items-center gap-2 px-4">
                        <FaGithub size={20} className="text-gray-700"/>
                    </button>
                    <button className="p-2 bg-gray-200 rounded flex items-center gap-2 px-4">
                        <FaFacebook size={20} className="text-blue-600"/>
                    </button>
                </div>

                <p className="text-center text-gray-600 mt-4">
                    Don&#39;t have an account? <span className="text-blue-600 cursor-pointer">Register for free</span>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;

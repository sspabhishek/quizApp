// filepath: /C:/Users/hp/Desktop/Quiz/quizApp/frontend/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../services/api";
import { loginSuccess } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.email && state.password) {
      try {
        const response = await login(state.email, state.password);
        
        localStorage.setItem("token", response.token);

        dispatch(loginSuccess({ user: response.user, token: response.token }));
        console.log("Login Successful!");
        navigate("/");
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Invalid email or password.");
      }
    } else {
      alert("Please fill out both fields.");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login feature coming soon!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h3 className="mb-10 text-4xl font-extrabold text-neutral-800 text-center">Sign In</h3>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full py-3 mb-6 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <img
            src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
            alt="Google"
            className="h-5 mr-2"
          />
          Sign in with Google
        </button>

        <div className="flex items-center mb-3">
          <hr className="flex-grow border-gray-400" />
          <p className="mx-4 text-gray-600">or</p>
          <hr className="flex-grow border-gray-400" />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-900">
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={state.email}
            onChange={handleChange}
            placeholder="mail@example.com"
            className="w-full px-4 py-3 text-sm bg-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm text-gray-900"
          >
            Password*
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-3 text-sm bg-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign In
        </button>

        <p className="mt-4 text-sm text-gray-700">
          Not registered yet?{" "}
          <a href="/register" className="font-bold text-blue-500 hover:underline">
            Create an Account
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
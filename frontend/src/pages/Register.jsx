import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;

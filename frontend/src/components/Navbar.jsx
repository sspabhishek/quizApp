import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-xl">Quiz App</Link>
      <div>
        {user ? (
          <button onClick={handleLogout} className="text-white">
            Logout
          </button>
        ) : (
          <div>
            <Link to="/login" className="text-white mr-4">Login</Link>
            <Link to="/register" className="text-white">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

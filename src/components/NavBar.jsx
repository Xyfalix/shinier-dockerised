import { logout } from "../utilities/users-service";
import { useNavigate, Link } from "react-router-dom";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login")
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    setUser(null);
  };

  return (
    <nav className="bg-indigo-700 text-primary-content py-2">
      {user ? ( // user is signed in
        <div className="flex justify-between">
          <div className="flex flex-row items-center">
            <a className="btn btn-ghost normal-case text-2xl">Shinier</a>
            <p className="text-lg mx-4">Pokemon</p>
          </div>
          <div className="flex flex-row items-center">
            <Link to="/shoppingCart">
              <p className="mx-2">🛍️</p>
            </Link>
            <Link to="/favourites">
              <p className="mx-2 text-2xl">♡</p>
            </Link>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost rounded-btn">
                👤 {user.name}
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] p-2 shadow bg-indigo-700 rounded-box w-32 mt-2 items-start"
              >
                <li>
                  <p>My Orders</p>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        // user === null
        <div className="flex justify-between">
          <div className="flex flex-row items-center">
            <a className="btn btn-ghost normal-case text-2xl">Shinier</a>
            <p className="text-lg mx-4">Pokemon</p>
          </div>
          <div className="flex flex-row items-center">
            <a className="btn btn-ghost normal-case text-lg" onClick={handleClick}>👤 Log In</a>
          </div>
        </div>
      )}
    </nav>
  );
}
import { logout } from "../utilities/users-service";

export default function NavBar({user, setUser}) {

   const handleLogout = (event) => {
    event.preventDefault();
    logout();
    setUser(null);
  };

  return (
    <nav className="bg-primary text-primary-content">
      <div className="flex justify-between">
        <div className="flex flex-row items-center">
          <a className="btn btn-ghost normal-case text-2xl">Shinier</a>
          <p className="text-lg mx-4">Pokemon</p>
        </div>
        <div className="flex flex-row items-center">
          <p className="mx-2">My Orders</p>
          <p className="mx-2">🛍️</p>
          <p className="mx-2 text-2xl">♡</p>
          <p className="text-lg mx-2">👤 {user.name}</p>
          <button className="mx-2" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
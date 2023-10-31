import NavBar from "../../components/NavBar";
import CartCard from "../../components/CartCard";
import { getUser } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ShoppingCart(updateFirstSearch) {
  const [user, setUser] = useState(getUser);
  const navigate = useNavigate();

  function handleSearch(searchInput) {
    updateFirstSearch(searchInput);
    navigate(`/search?q=${searchInput}`);
  }

  return (
    <>
      <NavBar user={user} setUser={setUser} handleSearch={handleSearch} />
      <div className="shopping-cart-container w-8/12">
        <p>Shopping Cart</p>
        <div className="flex flex-row w-96 bg-white mx-2 my-5 p-3 justify-between items-center">
          <p className="mx-2 text-black">xx Total Items</p>
          <button className="btn btn-sm bg-orange-600 text-white">Continue Shopping</button>
        </div>
        <CartCard />
      </div>
    </>
  );
}
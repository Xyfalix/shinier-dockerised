import NavBar from "../../components/NavBar";
import CartCard from "../../components/CartCard";
import { getUser, getCart } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ShoppingCart({ updateFirstSearch }) {
  const [user, setUser] = useState(getUser);
  const [cartData, setCartData] = useState(null);
  const navigate = useNavigate();

  function handleSearch(searchInput) {
    updateFirstSearch(searchInput);
    navigate(`/search?q=${searchInput}`);
  }

  // run getCart to display current items in shoppingCart and update
  const fetchCart = async () => {
    try {
      const cart = await getCart();
      setCartData(cart);
    } catch (error) {
      console.error("Error fetching cart data: ", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // rerun getCart when qty is changed for any card item in cart
  const handleQuantityUpdate = async () => {
    await fetchCart();
  };

  return (
    <>
      <NavBar user={user} setUser={setUser} handleSearch={handleSearch} />
      <div className="shopping-cart-container w-8/12">
        <p className="text-3xl text-white mx-2 my-5">Shopping Cart</p>
        <div className="flex flex-row w-96 bg-white mx-2 my-5 p-3 justify-between items-center">
          <p className="mx-2 text-black">
            {cartData?.totalQty || 0} Total Items
          </p>
          <p>
            {typeof cartData?.orderTotal === "number"
              ? `$${cartData.orderTotal.toFixed(2)}`
              : ""}
          </p>
          <button
            className="btn btn-sm bg-slate-800 text-white"
            onClick={() => navigate(`/search`)} // Navigate to the shopping page
          >
            Continue Shopping
          </button>
        </div>
        {cartData?.cartWithExtPrice?.length > 0 ? (
          // Cart is not empty
          cartData.cartWithExtPrice.map((cartItem) => (
            <CartCard
              key={cartItem._id}
              name={cartItem.item.itemName}
              cardId={cartItem.item.itemId}
              qty={cartItem.qty}
              price={cartItem.item.itemPrice}
              rarity={cartItem.item.itemRarity}
              image={cartItem.item.itemImage}
              setName={cartItem.item.setName}
              setNum={cartItem.item.setNumber}
              setTotal={cartItem.item.setTotal}
              extPrice={cartItem.extPrice}
              handleQuantityUpdate={handleQuantityUpdate}
            />
          ))
        ) : (
          // Cart is empty
          <div className="text-center">
            <p>Your cart is empty 😔</p>
          </div>
        )}
      </div>
    </>
  );
}

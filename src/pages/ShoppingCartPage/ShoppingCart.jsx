import NavBar from "../../components/NavBar";
import CartCard from "../../components/CartCard";
import { getUser, getCart } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// when add to cart is clicked, take selected qty and itemId and run addtoCart function
// toggle default value of item to selected qty + current qty in cart
// display thumbnail card image
// display card description (card.name, card.number/card.set.total, card.rarity)
// display card set (card.set.name)
// display card price (price)
// display ext price based on base card price * current qty

export default function ShoppingCart({updateFirstSearch}) {
  const [user, setUser] = useState(getUser);
  const [cartData, setCartData] = useState(null);
  const navigate = useNavigate();

  function handleSearch(searchInput) {
    updateFirstSearch(searchInput);
    navigate(`/search?q=${searchInput}`);
  }

  // run getCart to display current items in shoppingCart and update
  useEffect(() => {
    async function fetchCart() {
      try {
        const cart = await getCart();
        setCartData(cart);
      } catch (error) {
        console.error("Error fetching cart data: ", error);
      }
    }

    fetchCart();
  }, []);

  return (
    <>
    <NavBar user={user} setUser={setUser} handleSearch={handleSearch} />
    <div className="shopping-cart-container w-8/12">
      <p className="text-3xl text-white mx-2 my-5">Shopping Cart</p>
      <div className="flex flex-row w-96 bg-white mx-2 my-5 p-3 justify-between items-center">
        <p className="mx-2 text-black">
          {cartData?.lineItems?.length || 0} Total Items
        </p>
        <button
         className="btn btn-sm bg-slate-800 text-white"
         onClick={() => navigate(`/search`)} // Navigate to the shopping page
        >
          Continue Shopping
        </button>
      </div>
      {cartData?.lineItems?.length > 0 ? (
        // Cart is not empty
        cartData.lineItems.map((cartItem) => (
          <CartCard
            key={cartItem._id}
            cardId={cartItem.item.itemId}
            name={cartItem.item.itemName}
            qty={cartItem.qty}
            price={cartItem.item.itemPrice}
            rarity={cartItem.item.itemRarity}
            image={cartItem.item.itemImage}
            setName={cartItem.item.setName}
            setNum={cartItem.item.setNumber}
            setTotal={cartItem.item.setTotal}
          />
        ))
      ) : (
        // Cart is empty
        <div className="text-center">
          <p>Your cart is empty.</p>
          <button
            className="btn btn-sm bg-slate-800 text-white"
            onClick={() => navigate(`/search`)} // Navigate to the shopping page
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  </>
  );
}
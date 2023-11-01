import { Link } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";
import { addToCart } from "../utilities/users-service";
import { useState } from "react";

export default function Card({
  cardId,
  cardName,
  cardImage,
  setName,
  setNumber,
  setTotal,
  rarity,
  price,
}) {
  const [qtyAdded, setQtyAdded] = useState(1);

  const handleDropdownChange = (e) => {
    setQtyAdded(e.target.value); // Convert the value to an integer
  };

  async function handleAddToCart() {
    const cardDetails = {
      itemName: cardName,
      itemPrice: price,
      itemRarity: rarity,
      itemImage: cardImage,
      setName: setName,
      setNumber: setNumber,
      setTotal: parseInt(setTotal),
    };

    try {
      console.log(cardDetails);
      await addToCart(cardId, qtyAdded, cardDetails);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  return (
    <>
      <div className="w-80 bg-gray-600 flex flex-col items-start">
        <Link to={`/cardDetails/${cardId}`}>
          <figure className="self-center m-3">
            <img src={cardImage} alt={cardName} />
          </figure>
        </Link>
        <div className="flex flex-col pl-10">
          <p className="text-white">
            {cardName} - {setNumber}/{setTotal}
          </p>
          <p className="text-white">{rarity}</p>
          <p className="text-white">{setName}</p>
          <div className="flex flex-row justify-between items-center basis-full">
            <p className={`text-green-500 mr-3 my-5 ${price === "Out of Stock" ? "text-red-500" : ""}`}>
              {price !== "Out of Stock" ? `$${price}` : price}
            </p>
            <select
              className="select outline select-xs bg-white border-grey-600 rounded-md my-2 mx-3"
              defaultValue="1"
              onChange={handleDropdownChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button
              onClick={handleAddToCart}
              className="btn btn-sm bg-indigo-700 mx-3"
              disabled={price === "Out of Stock"}
            >
              <BsFillCartPlusFill />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

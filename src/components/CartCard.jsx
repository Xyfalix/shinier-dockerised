import { setItemQty, deleteItemFromCart } from "../utilities/users-service";

export default function CartCard({
  cardId,
  name,
  qty,
  price,
  rarity,
  image,
  setName,
  setNum,
  setTotal,
  extPrice,
  handleQuantityUpdate,
}) {
  async function handleChange(e) {
    const newQty = e.target.value;

    try {
      await setItemQty(cardId, newQty);
      handleQuantityUpdate();
    } catch (error) {
      console.error("Error changing card qty: ", error);
    }
  }

  async function handleDelete() {
    try {
      await deleteItemFromCart(cardId);
      handleQuantityUpdate();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  return (
    <div className="card card-side bg-slate-800 shadow-xl flex flex-row justify-between items-center min-w-max max-w-lg border-2 border-white mx-2 my-5">
      <div className="flex flex-row w-full justify-between">
        <div className="image-desc container flex flex-row">
          <figure>
            <img
              src={image}
              alt="pokemon card"
              className="w-20 h-30 my-3 ml-2"
            />
          </figure>
          <div className="desc-container flex flex-col text-white mx-5 justify-center">
            <p>{name}</p>
            <p>
              {setNum}/{setTotal}
            </p>
            <p>{rarity}</p>
            <p>{setName}</p>
            <p>${price.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex flex-col justify-around">
          <button
            className="btn btn-sm bg-slate-800 border-none self-end mb-5"
            onClick={handleDelete}
          >
            🗑️
          </button>
          <div className="flex flex-row justify-end items-center">
            <select
              className="select outline select-sm bg-white border-grey-600 rounded-md mb-2 mr-2"
              defaultValue={qty}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <p className="ml-8 mr-2">${extPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

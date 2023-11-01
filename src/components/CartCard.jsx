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
        console.log("hi")
        await deleteItemFromCart(cardId);
        handleQuantityUpdate();
    } catch (error) {
        console.error("Error deleting item:", error)
    }
  }

  return (
    <div className="card card-side bg-white shadow-xl flex flex-row justify-between items-center min-w-max max-w-2xl">
      <figure>
        <img src={image} alt="pokemon card" className="w-28 h-36 m-2" />
      </figure>
      <div className="m-2">
        <p>{name}</p>
        <p>
          {setNum}/{setTotal}
        </p>
        <p>{rarity}</p>
        <p>{setName}</p>
        <p>${price.toFixed(2)}</p>
      </div>
      <div>
        <select
          className="select outline select-sm bg-white border-grey-600 rounded-md m-2"
          defaultValue={qty}
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <p>${extPrice.toFixed(2)}</p>
      <button
        className="btn btn-sm bg-white border-none justify-self-end self-start m-2"
        onClick={handleDelete}
      >
        🗑️
      </button>
    </div>
  );
}

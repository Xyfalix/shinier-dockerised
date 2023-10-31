export default function CartCard({
  name,
  qty,
  price,
  rarity,
  image,
  setName,
  setNum,
  setTotal,
}) {
  return (
    <div className="card card-side bg-white shadow-xl flex flex-row justify-between items-center min-w-max max-w-2xl">
      <figure>
        <img
          src={image}
          alt="pokemon card"
          className="w-28 h-36 m-2"
        />
      </figure>
      <div className="m-2">
        <p>{name}</p>
        <p>{setNum}/{setTotal}</p>
        <p>{rarity}</p>
        <p>{setName}</p>
        <p>${price}</p>
      </div>
      <div>
        <select
          className="select outline select-sm bg-white border-grey-600 rounded-md m-2"
          defaultValue={qty}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <p>Ext Price</p>
      <button className="btn btn-sm bg-white border-none justify-self-end self-start m-2">
        🗑️
      </button>
    </div>
  );
}

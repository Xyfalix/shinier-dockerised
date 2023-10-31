import { Link } from "react-router-dom";
import { BsFillCartPlusFill } from 'react-icons/bs'

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
  return (
    <>
      <Link to={`/cardDetails/${cardId}`}>
        <div className="w-80 bg-gray-600 flex flex-col items-start">
          <figure className="self-center m-3">
            <img src={cardImage} alt={cardName} />
          </figure>
          <div className="flex flex-col pl-10">
            <p className="text-white">
              {cardName} - {setNumber}/{setTotal}
            </p>
            <p className="text-white">{rarity}</p>
            <p className="text-white">{setName}</p>
            <div className="flex flex-row justify-between items-center basis-full">
              <p className="text-green-500 mr-3 my-5">{price}</p>
              <select
                className="select outline select-xs bg-white border-grey-600 rounded-md my-2 mx-3"
                defaultValue="1"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="btn btn-sm bg-indigo-700 mx-3"><BsFillCartPlusFill /></button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

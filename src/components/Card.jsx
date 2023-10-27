export default function Card({cardName, cardImage, setName, setNumber, setTotal, rarity, price}) {
  return (
    <>
      <div className="w-80 bg-gray-600 flex flex-col items-start">
        <figure className="self-center m-3">
          <img 
            src={cardImage}
            alt={cardName}
          />
        </figure>
        <div className="flex flex-col pl-10">
          <p className="text-white">{cardName} - {setNumber}/{setTotal}</p>
          <p className="text-white">{rarity}</p>
          <p className="text-white">{setName}</p>
          <p className="text-green-500">
            {price}
          </p>
          <div>
            <button className="btn btn-sm bg-indigo-700 pb-2">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

import { useParams } from "react-router-dom";
import Review from "../../components/Review";

export default function CardDetails({ cardsDetails }) {
  const { cardId } = useParams();
  console.log(cardId);
  console.log(cardsDetails);
  const card = cardsDetails.find((card) => card.id === cardId);
  const image = card.images.large;
  const reviewArray = [1, 2, 3];

  return (
    <>
      <div className="card-details-container flex flex-row m-5">
        <div className="card-image w-6/12">
          <img src={image} alt={card.name} />
        </div>
        <div className="more-details w-6/12 flex flex-col items-center justify-items-center">
          <p className="text-white m-5">No. in stock at $1.99</p>
          <p className="text-white m-5">Card Rating here</p>
        <div className="review-container m-5"> 
          {reviewArray.map((review, index) => (
            <Review
              key={index}
            />
          ))}
        </div>   
        </div>
      </div>
    </>
  );
}
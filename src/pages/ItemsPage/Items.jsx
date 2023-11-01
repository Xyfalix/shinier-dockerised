import { useState, useEffect } from "react";
import { getAllItems } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

export default function Items() {
  const [items, setItems] = useState(null);
  const navigate = useNavigate();

  const getItems = async () => {
    try {
      const cardItems = await getAllItems();
      console.log(cardItems);
      setItems(cardItems);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  async function handleAddItem() {
    navigate("/addItems");
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="text-3xl text-white m-5">Card Quantity List</p>
        <button onClick={handleAddItem} className="m-5 btn btn-md bg-slate-600 text-white">Add Item</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table text-center mt-4">
          {/* head */}
          <thead>
            <tr>
              <th>Card Id</th>
              <th>Card Name</th>
              <th>Set Name</th>
              <th>Rarity</th>
              <th>Available Stock</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr className="hover" key={item._id}>
                <td>{item.itemId}</td>
                <td>{item.itemName}</td>
                <td>{item.setName}</td>
                <td>{item.itemRarity}</td>
                <td>{item.availableStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

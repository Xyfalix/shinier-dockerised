import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddItems() {
  const initialFields = {
    itemId: "",
    itemName: "",
    itemPrice: 0,
    itemRarity: "",
    itemImage: "",
    setName: "",
    setNumber: "",
    setTotal: 0,
    availableStock: 0,
  };

  const [formData, setFormData] = useState(initialFields);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request with formData to add a new item
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Item added successfully
        console.log("Item added successfully");
        setFormData(initialFields); // Reset the form
      } else {
        // Handle error
        console.error("Error adding item");
      }
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  return (
    <div>
      <p className="text-3xl text-white text-center m-5">Add a New Item</p>
      <div className="form-container bg-slate-500 mx-auto max-w-md p-5 rounded border">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="text-m my-1 mx-4 text-white font-serif flex flex-col">
              Card Id:
              <input
                type="text"
                name="itemId"
                value={formData.itemId}
                onChange={handleChange}
              />
            </label>
            <label className="text-m my-1 mx-4 text-white font-serif flex flex-col">
              Card Name:
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
              />
            </label>
            <label className="text-m my-1 mx-4 text-white font-serif flex flex-col">
              Price:
              <input
                type="number"
                name="itemPrice"
                value={formData.itemPrice}
                onChange={handleChange}
              />
            </label>
            <label className="text-m my-1 mx-4 text-white font-serif flex flex-col">
              Rarity:
              <input
                type="text"
                name="itemRarity"
                value={formData.itemRarity}
                onChange={handleChange}
              />
            </label>
            <label className="text-m my-1 mx-4 text-white font-serif flex flex-col">
              Card Image URL:
              <input
                type="text"
                name="itemImage"
                value={formData.itemImage}
                onChange={handleChange}
              />
            </label>
            <label className="text-m my-1 mx-4 text-white font-serif flex flex-col">
              Set Name:
              <input
                type="text"
                name="setName"
                value={formData.setName}
                onChange={handleChange}
              />
            </label>
            <label className="text-m my-1 mx-4 text-white font-serif flex flex-col">
              Card Number in Set:
              <input
                type="text"
                name="setNumber"
                value={formData.setNumber}
                onChange={handleChange}
              />
            </label>
            <label className="text-m my-1 mx-4 text-white font-serif flex flex-col">
              Set Number Total:
              <input
                type="number"
                name="setTotal"
                value={formData.setTotal}
                onChange={handleChange}
              />
            </label>
            <label className="text-m my-1 mx-4 text-white font-serif flex flex-col">
              Available Stock:
              <input
                type="number"
                name="availableStock"
                value={formData.availableStock}
                onChange={handleChange}
              />
            </label>
            <div className="button-container flex flex-row justify-around mt-5">
              <button
                className="btn btn-md bg-slate-700 text-white"
                type="submit"
              >
                Add Item
              </button>
              <button
                className="btn btn-md bg-slate-700 text-white"
                type="button"
                onClick={() => navigate("/viewItems")}
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

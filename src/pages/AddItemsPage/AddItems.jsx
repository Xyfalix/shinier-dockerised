import { useState } from "react";

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

  const fieldNames = Object.keys(initialFields);

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
            {fieldNames.map((fieldName) => (
              <label
                className="text-m my-2 mx-4 text-white font-serif"
                key={fieldName}
              >
                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
                <input className="mx-5"
                  type={
                    fieldName === "itemPrice" ||
                    fieldName === "setTotal" ||
                    fieldName === "availableStock"
                      ? "number"
                      : "text"
                  }
                  name={fieldName}
                  value={formData[fieldName]}
                  onChange={handleChange}
                />
              </label>
            ))}
            <button className="m-5 btn btn-md bg-slate-600 text-white" type="submit">Add Item</button>
          </div>
        </form>
      </div>
    </div>
  );
}

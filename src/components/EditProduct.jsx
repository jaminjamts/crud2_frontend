import { BACKEND_ENDPOINT } from "@/constants/constants";
import { useState } from "react";

export const EditProduct = ({ handleVisible, productItems, productId }) => {
  const [editCategoryValue, seteditCategoryValue] = useState("");
  const id = productId;
  const editCategoryValueFunction = (e) => {
    seteditCategoryValue(e.target.value);
  };
  const handleEditedValue = async (event) => {
    event.preventDefault();
    const editedValue = {
      id: id,
      productName: event.target.editedProductName.value,
      category: editCategoryValue,
      price: event.target.editedProductPrice.value,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedValue),
    };
    const response = await fetch(BACKEND_ENDPOINT, options);
    const data = await response.json();
    handleVisible();
  };

  return (
    <main
      className="absolute h-screen w-screen bg-[#E5D9F2] top-0 right-0 flex justify-center items-center"
      onClick={handleVisible}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-1/2 w-1/2 bg-slate-500 rounded-2xl flex justify-center items-center flex-col"
      >
        <h1>Edit Product</h1>
        <form onSubmit={handleEditedValue} className="flex flex-col gap-2 p-4">
          <div>
            <label>Product Name</label>
            <input
              type="text"
              className="bordered bg-gray-200 w-full p-1 rounded-md"
              placeholder={productItems.productName}
              name="editedProductName"
            />
          </div>
          <div>
            <label>category</label>
            <select
              onChange={editCategoryValueFunction}
              className="select-bordered flex max-w-xs bg-gray-200 w-full p-2 rounded-md"
              defaultValue={`${productItems?.category}`}
            >
              <option value="pant">pant</option>
              <option value="shirt">t-shirt</option>
              <option value="shoes">shoes</option>
              <option value="outwear">outerwear</option>
            </select>
          </div>
          <div>
            <label>Price</label>
            <input
              type="text"
              className="bordered bg-gray-200 w-full p-1 rounded-md"
              placeholder={productItems?.price}
              name="editedProductPrice"
            />
          </div>
          <button className="bordered bg-gray-200 w-full p-1 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

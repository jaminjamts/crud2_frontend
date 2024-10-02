import { BACKEND_ENDPOINT } from "@/constants/constants";
import { useState } from "react";

export const AddProductCard = ({ isModal, modal }) => {
  const [category, setCategory] = useState("");

  const selectedValue = (event) => {
    setCategory(event.target.value);
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    const productData = {
      productName: event.target.productName.value,
      category: category,
      price: event.target.price.value,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    };
    const response = await fetch(BACKEND_ENDPOINT, options);
    const data = await response.json();
    modal();
  };

  return (
    <div>
      <button className="btn btn-neutral" onClick={modal}>
        Add product
      </button>
      {isModal ? (
        <div className="hidden"></div>
      ) : (
        <div
          className="w-screen h-screen flex justify-center items-center absolute top-0 left-0"
          onClick={modal}
        >
          <div className="absolute bg-cyan-50 p-5 rounded-lg ">
            <form
              onSubmit={handleAddProduct}
              className="flex flex-col gap-2 "
              onClick={(e) => e.stopPropagation()}
            >
              <label className="flex flex-col">Product name</label>
              <input
                placeholder="Product name"
                name="productName"
                type="text"
                className="p-2 rounded-md bg-gray-200"
              />
              <label className="flex flex-col ">Category</label>
              <select
                className="select-bordered flex max-w-xs bg-gray-200 w-full p-2 rounded-md"
                onChange={selectedValue}
                defaultValue={""}
              >
                <option disabled hidden value={""}>
                  Please choose category
                </option>
                <option value="shirt">Shirt</option>
                <option value="pant">Pant</option>
                <option value="outwear">Outwear</option>
                <option value="shoes">Shoes</option>
              </select>
              <label>Price</label>
              <input
                type="number"
                placeholder="Please enter a price"
                name="price"
                className="p-2 rounded-md bg-gray-200 content-none"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

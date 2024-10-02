import { EditIcon, TrashIcon } from "@/app/icons";
import { EditProduct } from "./EditProduct";
import { useState } from "react";

export const ProductCard = ({
  productName,
  category,
  price,
  id,
  deleteProduct,
  editProduct,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const productId = id;
  const productItems = { productName, category, price };

  const handleVisible = () => {
    return setIsVisible(!isVisible);
  };

  return (
    <main className="bg-gray-200 w-[300px]  h-[150px] flex flex-col justify-between p-5 rounded-lg">
      <div className="flex  justify-between">
        <p>Product Name : </p>
        <div className="flex gap-4">
          <div onClick={handleVisible}>
            <EditIcon />
          </div>
          {isVisible ? (
            <div className="">
              <EditProduct
                productId={productId}
                productItems={productItems}
                handleVisible={handleVisible}
                editProduct={editProduct}
              />
            </div>
          ) : (
            <div className=""></div>
          )}

          <button onClick={() => deleteProduct({ productId })}>
            <TrashIcon />
          </button>
        </div>
      </div>
      <span className="flex justify-end font-bold">{productName}</span>

      <p>
        Category : <span>{category}</span>
      </p>
      <p>
        Price : <span>{price} $</span>
      </p>
    </main>
  );
};

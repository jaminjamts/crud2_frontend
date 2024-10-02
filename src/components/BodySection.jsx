import { ProductCard } from "./ProductCard";

export const BodySection = ({ datas, deleteProduct, editProduct }) => {
  return (
    <main className="w-full flex flex-wrap gap-4 justify-between py-10    ">
      {datas.map((data) => (
        <div key={data.id}>
          {
            <ProductCard
              deleteProduct={deleteProduct}
              editProduct={editProduct}
              id={data.id}
              productName={data.productName}
              category={data.category}
              price={data.price}
            />
          }
        </div>
      ))}
    </main>
  );
};

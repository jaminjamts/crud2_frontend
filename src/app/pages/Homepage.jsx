"use client";
import { AddProductCard } from "@/components/AddProductCard";
import { BodySection } from "@/components/BodySection";
import { useEffect, useState } from "react";

const Page = () => {
  const BACKEND_ENDPOINT = "http://localhost:1111";
  const [isModal, setIsModal] = useState(true);
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);

  const modal = () => {
    setIsModal(!isModal);
  };
  const fetchData = async () => {
    try {
      const response = await fetch(BACKEND_ENDPOINT);
      const data = await response?.json();
      setDatas(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const editProduct = async (e) => {
    const editProductId = e.productId;
  };

  const deleteProduct = async (e) => {
    const product = e.productId;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: product }),
    };
    const response = await fetch(BACKEND_ENDPOINT, options);
    const data = await response.json();
  };

  useEffect(() => {
    fetchData();
  }, [isModal, deleteProduct, editProduct]);

  return (
    <main className="w-screen h-screen flex justify-center">
      <div className="container max-w-screen-lg p-10 flex flex-col">
        <div className="flex justify-between">
          <div>Logo</div>
          <AddProductCard modal={modal} isModal={isModal} />
        </div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BodySection
              datas={datas}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;

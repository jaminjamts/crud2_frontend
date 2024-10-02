"use client";
import { AddProductCard } from "@/components/AddProductCard";
import { BodySection } from "@/components/BodySection";
import { BACKEND_ENDPOINT } from "@/constants/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
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
    <main className="w-screen flex justify-center bg-[#E5D9F2] min-h-screen">
      <div className="container max-w-screen-lg px-10 flex flex-col">
        <div className="flex justify-between ">
          <button
            className="btn btn-neutral self-center"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Contact me
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <div className="flex flex-col  justify-center items-center gap-4 ">
                <h3 className="font-bold text-lg">Phone number : 99119911</h3>
                <h3 className="font-bold text-lg">E-Mail : lorem@gmail.com</h3>
                <h3 className="font-bold text-lg">Social address : Ligthman</h3>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn  bg-{#434a54}">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <Link href="" className="link link-n text-lg">
            <img src="/logo.png" alt="logo" width="100px" height="100px" />
          </Link>
          <div className="flex justify-center items-center ">
            <AddProductCard modal={modal} isModal={isModal} />
          </div>
        </div>
        <div className="">
          {loading ? (
            <div className="h-screen w-full flex pt-20 items-center flex-col gap-4">
              <img src="/logo.png" alt="" srcset="" />
              Loading...
            </div>
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

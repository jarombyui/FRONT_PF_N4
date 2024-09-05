import { useState } from "react";
import { Modal } from "./Modal";
import { Authcontext } from "../context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { dataUser, logout, options, modal } = useContext(Authcontext);
  
  return (
    <header className="w-full h-[70px] border-b flex justify-end items-center">
      <div className="px-10 h-full flex justify-center gap-2 items-center ">
        <figure>
          <img
            src={"https://picsum.photos/200"}
            alt={dataUser?.data?.nombres}
            className="rounded-lg"
            width={32}
            height={32}
          />
        </figure>

        <h1>{dataUser?.data?.nombres}</h1>

        <button onClick={() => setShowModal(!showModal)}>
          {showModal ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {showModal && <Modal setShowModal={setShowModal} />}
      </div>
    </header>
  );
};

export default Header;


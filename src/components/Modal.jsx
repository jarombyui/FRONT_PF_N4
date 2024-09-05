import { Authcontext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const Modal = ({ setShowModal }) => {
  const { dataUser, logout, options, modal } = useContext(Authcontext);

  const navigate = useNavigate();

  const handleProfileClick = () => {
      navigate('/dashboard');
  };

  return (
    <div className="w-[150px] h-[140px] border border-[#E0E0E0] rounded-xl flex flex-col justify-center gap-2 font-NotoSans absolute top-[70px] px-2 py-2">
      <button
        onClick={()=> setShowModal(false)}
        className="flex p-2 w-full h-2/4 gap-2  hover:bg-slate-200 hover:rounded-lg items-center"
      >
        <figure>
          <img
            src="logos del header/mycount.svg"
            alt="icon de perfil"
            className="w-[20px] h-[20px]"
          />
        </figure>
        <h1 onClick={handleProfileClick} className="font-medium text-[14px] text-[#4f4f4f]">Mi cuenta </h1>
      </button>

      <button
        className="flex p-2 w-full h-2/4 gap-2 border-t border-t-[#E0E0E0]  hover:bg-red-200/30 hover:rounded-lg items-center"
        onClick={()=> setShowModal(false)}
      >
        <figure>
          <img
            src="/logos del header/logout.svg"
            alt="icon de salir"
            className="w-[20px] h-[20px]"
          />
        </figure>
        <h1 onClick={logout} className="font-medium text-[14px] text-[#EB5757]">Logout</h1>
      </button>
    </div>
  );
};



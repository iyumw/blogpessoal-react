import Popup from "reactjs-popup";
import FormPostagem from "../formpostagem/FormPostagem";

import "reactjs-popup/dist/index.css";
import "./ModalPostagem.css";

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button className="rounded-lg bg-pink-50 border-pink-50 hover:bg-blush-50 hover:border-blush-100 hover:text-purple border-solid border-2 py-2 px-4 duration-300 ease-in-out ">
            Nova Postagem
          </button>
        }
        modal
      >
        <FormPostagem />
      </Popup>
    </>
  );
}

export default ModalPostagem;

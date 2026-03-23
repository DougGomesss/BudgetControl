import { X } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { InfoPessoas } from "../../Interfaces/InfoPessoas";
import { InfoCategorias } from "../../Interfaces/InfoCategorias";
import { InfoTransacoes } from "../../Interfaces/InfoTransacoes";
import "./Modal.scss";

interface ModalProps<T> {
  isOpen: boolean;
  titulo: string;
  SalvarCadastroEdicao(): void;
  isLoading: boolean;
  onClose(): void;
  items: T;
  children: React.ReactNode;
}

function Modal({
  isOpen,
  titulo,
  onClose,
  items,
  isLoading,
  children,
  SalvarCadastroEdicao,
}: ModalProps<InfoPessoas | InfoCategorias | InfoTransacoes | null>) {
  const modoEdicao = !!items;
  if (!isOpen) return null;

  return (
    <div className="backgroundStyle">
      <ToastContainer />
      <div className="modalStyle">
        <div className="header">
          <div>
            {modoEdicao ? "Editar cadastro " + titulo : "Cadastro " + titulo}
          </div>
          {!isLoading && (
            <button onClick={onClose} id="botoes">
              <X />
            </button>
          )}
        </div>
        <div className="body">{children}</div>
        <footer>
          {!isLoading && <button onClick={onClose}>cancelar</button>}
          <button
            onClick={() => {
              SalvarCadastroEdicao();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : modoEdicao ? (
              "Editar"
            ) : (
              "Cadastrar"
            )}
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Modal;

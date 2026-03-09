import { X } from "lucide-react";
import "./Modal.scss";
import { useRef } from "react";
import { InfoPessoas } from "../../pages/CadastroPessoas/CadastroPessoas";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  titulo: string;
  SalvarCadastroEdicao(item: InfoPessoas): void;
  isLoading: boolean;
  onClose(): void;
  items: InfoPessoas | null | undefined;
}

function Modal({
  isOpen,
  titulo,
  onClose,
  items,
  isLoading,
  SalvarCadastroEdicao,
}: ModalProps) {
  const modoEdicao = !!items;
  const nomeRef = useRef<HTMLInputElement>(null);
  const idadeRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSalvar = () => {
    const nomeVal = nomeRef.current?.value;
    const idadeVal = idadeRef.current?.valueAsNumber;

    if (!nomeVal || isNaN(idadeVal as number)) return;

    // Criei o objeto com os dados atuais dos inputs
    const dadosForm: InfoPessoas = {
      id: modoEdicao ? items!.id : 0, // 0 é ignorado pelo cadastro sequencial no pai
      nome: nomeVal,
      idade: idadeVal as number,
    };

    SalvarCadastroEdicao(dadosForm);
  };

  return (
    <div className="backgroundStyle">
      <ToastContainer />
      <div className="modalStyle">
        <div className="header">
          <div>
            {modoEdicao ? "Editar cadastro " + titulo : "Cadastrar " + titulo}
          </div>
          {!isLoading && (
            <button onClick={onClose} id="botoes">
              <X />
            </button>
          )}
        </div>
        <div className="body">
          <form
            className="flex flex-col gap-2 p-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-4 w-full">
              <div className="grupo-flutuante">
                <input
                  ref={nomeRef}
                  type="text"
                  id="nome"
                  className="input-branco"
                  placeholder=" "
                  required
                  defaultValue={modoEdicao ? items?.nome : ""}
                />
                <label htmlFor="nome" className="label-branco">
                  Nome Completo
                </label>
              </div>
              <div className="grupo-flutuante">
                <input
                  ref={idadeRef}
                  type="number"
                  id="idade"
                  className="input-branco"
                  placeholder=" "
                  required
                  defaultValue={modoEdicao ? items?.idade : ""}
                />
                <label htmlFor="idade" className="label-branco">
                  Idade
                </label>
              </div>
            </div>
          </form>
        </div>
        <footer>
          {!isLoading && <button onClick={onClose}>cancelar</button>}
          <button onClick={handleSalvar} disabled={isLoading}>
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

export class Reutilizando {}

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
  items: any | null;
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

  if (isOpen) {
    return (
      <>
        <div className="backgroundStyle">
          <ToastContainer />
          <div className="modalStyle">
            <div className="header">
              <div>
                {" "}
                {modoEdicao
                  ? "Editar cadastro " + titulo
                  : "Cadastrar " + titulo}
              </div>
              {!isLoading && (
                <button onClick={onClose} id="botoes">
                  {" "}
                  <X></X>
                </button>
              )}
            </div>
            <div className="body">
              {" "}
              <form className="flex flex-col gap-2 p-4">
                <div className="flex flex-col gap-4 w-full">
                  <div className="grupo-flutuante">
                    <input
                      ref={nomeRef}
                      type="text"
                      id="nome"
                      className="input-branco"
                      placeholder=" "
                      required
                      defaultValue={modoEdicao ? (items.nome ?? "") : ""}
                    />
                    <label htmlFor="nome" className="label-branco">
                      {modoEdicao ? "" : "Nome Completo"}
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
                      defaultValue={modoEdicao ? items.idade : ""}
                    />
                    <label htmlFor="idade" className="label-branco">
                      {modoEdicao ? "" : "Idade"}
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <footer>
              {!isLoading && (
                <button onClick={() => onClose()}>cancelar</button>
              )}

              {!isLoading ? (
                <button
                  onClick={() => {
                    items
                      ? SalvarCadastroEdicao(items)
                      : SalvarCadastroEdicao({
                          id: Math.floor(Math.random() * 100),
                          nome: nomeRef.current!.value,
                          idade: idadeRef.current!.valueAsNumber,
                        });
                  }}
                >
                  {modoEdicao ? "Editar" : "Cadastrar"}
                </button>
              ) : (
                <button disabled>
                  <FontAwesomeIcon icon={faSpinner} spin />
                </button>
              )}
            </footer>
          </div>
        </div>
      </>
    );
  }

  return null;
}

export default Modal;

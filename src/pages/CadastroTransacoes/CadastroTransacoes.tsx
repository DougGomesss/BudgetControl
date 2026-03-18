import { ArrowBigLeft, LogOut, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Listagem from "../../components/Listagem/Listagem";
import Modal from "../../components/Modal/Modal";
import Dropdown from "../../components/Dropdown/Dropdown";
import Blankstate from "../../components/Blankstate/Blankstate";

function CadastroTransacoes() {
  const [transacoes, setTransacoes] = useState<InfoTransacoes[]>([
    // {
    //   id: 1,
    //   descricao: "Categoria 1",
    //   valor: 55,
    //   categoria: "Despesa 1",
    //   pessoa: "ts",
    // },
    // {
    //   id: 2,
    //   descricao: "Categoria 2",
    //   valor: 55,
    //   categoria: "Despesa 2",
    //   pessoa: "ts",
    // },
    // {
    //   id: 3,
    //   descricao: "Categoria 3",
    //   valor: 55,
    //   categoria: "Despesa 3",
    //   pessoa: "ts",
    // },
  ]);
  const [exibirLista, setExibirLista] = useState(true);
  const [isOpen, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const descricaoRef = useRef<HTMLInputElement>(null);
  const valorRef = useRef<HTMLInputElement>(null);
  const categoriaRef = useRef<HTMLInputElement>(null);
  const pessoaRef = useRef<HTMLInputElement>(null);

  function retornandoEstado() {
    setOpenModal(!isOpen);
  }

  return (
    <>
      <h1 className="text-3xl text-slate-100 font-bold text-center">
        Cadastro de transações
      </h1>
      <div className="flex justify-between text-center mt-5">
        <div className="flex gap-5">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-slate-700 text-white p-2 rounded-md hover:bg-slate-600 transition-colors"
          >
            Criação
          </button>
          <Modal
            titulo="de pessoas"
            isOpen={isOpen}
            items={null}
            isLoading={isLoading}
            onClose={() => retornandoEstado()}
            SalvarCadastroEdicao={() => {
              // editarLista ? editar() : cadastro();
            }}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-4">
                <div className="grupo-flutuante">
                  <input
                    ref={descricaoRef}
                    type="text"
                    id="nome"
                    className="input-branco"
                    placeholder=" "
                    required
                    defaultValue={""}
                  />
                  <label htmlFor="nome" className="label-branco">
                    Descrição
                  </label>
                </div>
                <div className="grupo-flutuante">
                  <input
                    ref={valorRef}
                    type="number"
                    id="idade"
                    className="input-branco"
                    placeholder=" "
                    required
                    defaultValue={""}
                  />
                  <label htmlFor="idade" className="label-branco">
                    Valor
                  </label>
                </div>
                <div className="flex mt-5">
                  <Dropdown
                    onChange={() => null}
                    descricaoModal={["Tipo", "Pessoas"]}
                    items={transacoes}
                    itemsModal={["Despesa", "Receita"]}
                  ></Dropdown>
                  <div className="Categorias"></div>
                </div>
              </div>
            </form>
          </Modal>
        </div>
        <button className="bg-slate-700 text-white p-2 rounded-md hover:bg-slate-600 transition-colors">
          <Link to={"/"}>
            {" "}
            <ArrowBigLeft />
          </Link>
        </button>
      </div>

      <div className="mt-5 overflow-y-auto max-h-[700px] pr-2">
        {transacoes.length === 0 && (
          <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Blankstate texto={`transações`}>
              <LogOut size={50} />
            </Blankstate>
          </div>
        )}
        {transacoes.map((x) => (
          <Listagem key={x.id} textoPrincipal={x.descricao}></Listagem>
        ))}
      </div>
    </>
  );
}

export default CadastroTransacoes;

export interface InfoTransacoes {
  id: number;
  descricao: string;
  valor: number;
  categoria: string;
  pessoa: any; // (identificador da pessoa do cadastro anterior);
}

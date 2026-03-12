import { ArrowBigLeft } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Listagem from "../../components/Listagem/Listagem";
import Modal from "../../components/Modal/Modal";
import { toast } from "react-toastify";

function CadastroCategorias() {
  const [categorias, setCategorias] = useState<InfoCategorias[]>([
    {
      id: 1,
      descricao: "Categoria 1",
      Finalidade: "Despesa 1",
    },
    {
      id: 2,
      descricao: "Categoria 2",
      Finalidade: "Despesa 2",
    },
    {
      id: 3,
      descricao: "Categoria 3",
      Finalidade: "Despesa 3",
    },
  ]);

  const [exibirLista, setExibirLista] = useState(true);
  const [isOpen, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const descricao = useRef<HTMLInputElement>(null);
  const finalidade = useRef<HTMLInputElement>(null);

  function retornandoEstado() {
    setOpenModal(!isOpen);
  }

  function cadastro() {
    const dadosNovos: InfoCategorias = {
      id: 0,
      descricao: descricao.current!.value,
      Finalidade: finalidade.current!.value,
    };

    let maiorId = 0;
    for (let i = 0; i < categorias.length; i++) {
      if (categorias[i].id > maiorId) {
        maiorId = categorias[i].id;
      }
    }
    const novoId = maiorId + 1;
    const categoriaNova: InfoCategorias = { ...dadosNovos, id: novoId };

    console.log(categoriaNova);

    processarCadastro(categoriaNova);
  }

  const x = () => new Promise((resolve) => setTimeout(resolve, 2000));

  function processarCadastro(dadosNovos: InfoCategorias) {
    const jaExiste = categorias.some(
      (x) => x.descricao === dadosNovos.descricao,
    );

    console.log(dadosNovos);

    if (jaExiste) {
      toast.error("Descrição/Finalidade já cadastrada!");
    } else {
      toast
        .promise(x, {
          pending: {
            render() {
              setLoading(true);
              return "Cadastrando...";
            },
            icon: false,
          },
          success: {
            render() {
              setLoading(false);
              return "Cadastrado com sucesso!";
            },
          },
        })
        .then(() => {
          setCategorias((prev) => [...prev, dadosNovos]);
        });
    }
  }

  return (
    <>
      <h1 className="text-3xl text-slate-100 font-bold text-center">
        Cadastro de categorias
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
            titulo="de categorias"
            isOpen={isOpen}
            items={null}
            isLoading={isLoading}
            onClose={() => retornandoEstado()}
            SalvarCadastroEdicao={() => {
              cadastro();
            }}
          >
            <form
              className="flex flex-col gap-2 p-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-4 w-full">
                <div className="grupo-flutuante">
                  <input
                    ref={descricao}
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
                    ref={finalidade}
                    type="text"
                    id="nome"
                    className="input-branco"
                    placeholder=" "
                    required
                    defaultValue={""}
                  />
                  <label htmlFor="nome" className="label-branco">
                    Finalidade
                  </label>
                </div>
              </div>
            </form>
          </Modal>
          <button
            onClick={() => setExibirLista(!exibirLista)}
            className="bg-slate-700 text-white p-2 rounded-md hover:bg-slate-600 transition-colors"
          >
            Listagem
          </button>
        </div>
        <button className="bg-slate-700 text-white p-2 rounded-md hover:bg-slate-600 transition-colors">
          <Link to={"/"}>
            {" "}
            <ArrowBigLeft />
          </Link>
        </button>
      </div>

      <div className="mt-5 overflow-y-auto max-h-[700px] pr-2">
        {categorias.map((x) => (
          <Listagem
            key={x.id}
            textoPrincipal={`${x.descricao} - ${x.Finalidade}`}
            exibir={exibirLista}
          ></Listagem>
        ))}
      </div>
    </>
  );
}

export default CadastroCategorias;

export interface InfoCategorias {
  id: number;
  descricao: string;
  Finalidade: string; //dropdown
}

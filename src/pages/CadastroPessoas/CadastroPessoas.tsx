import { ArrowBigLeft, Pencil, Trash } from "lucide-react";
import { useRef, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { toast } from "react-toastify";
import Listagem from "../../components/Listagem/Listagem";
import { Link } from "react-router-dom";

function CadastroPessoas() {
  const [pessoas, setLista] = useState<InfoPessoas[]>([
    { id: 1, nome: "Jose", idade: 5 },
    { id: 2, nome: "Andre", idade: 18 },
    { id: 3, nome: "Douglas", idade: 22 },
    { id: 5, nome: "Jose", idade: 5 },
    { id: 6, nome: "Jose", idade: 5 },
    { id: 7, nome: "Andre", idade: 18 },
  ]);

  const [isOpen, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [exibirLista, setExibirLista] = useState(true);
  const [editarLista, setEditarLista] = useState<InfoPessoas | null>(null);

  const nomeRef = useRef<HTMLInputElement>(null);
  const idadeRef = useRef<HTMLInputElement>(null);

  const removerItem = (id: number) => {
    setLista((prev) => prev.filter((x) => x.id !== id));
  };

  const editarItem = (item: InfoPessoas) => {
    setEditarLista(item);
    setOpenModal(true);
  };

  function retornandoEstado() {
    setOpenModal(!isOpen);
    setEditarLista(null);
  }

  function editar() {
    const itemParaEditar: InfoPessoas = {
      id: editarLista!.id,
      nome: nomeRef.current!.value,
      idade: idadeRef.current!.valueAsNumber,
    };
    const x = () => new Promise((resolve) => setTimeout(resolve, 2000));

    toast
      .promise(x, {
        pending: {
          render() {
            setLoading(true);
            return "Editando cadastro...";
          },
          icon: false,
        },
        success: {
          render() {
            setLoading(false);
            return "Cadastro atualizado!";
          },
        },
        error: "Erro ao editar! 🤯",
      })
      .then(() => {
        setLista((prev) =>
          prev.map((p) => (p.id === itemParaEditar.id ? itemParaEditar : p)),
        );
      });
  }

  function cadastro() {
    const dadosNovos: InfoPessoas = {
      id: 0,
      nome: nomeRef.current!.value,
      idade: idadeRef.current!.valueAsNumber,
    };

    let maiorId = 0;
    for (let i = 0; i < pessoas.length; i++) {
      if (pessoas[i].id > maiorId) {
        maiorId = pessoas[i].id;
      }
    }
    const novoId = maiorId + 1;
    const pessoaComNovoId = { ...dadosNovos, id: novoId };
    const atualizarLista = () => {
      setLista([...pessoas, pessoaComNovoId]);
      setLoading(false);
    };

    const x = () => new Promise((resolve) => setTimeout(resolve, 2000));

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
        error: "Erro ao cadastrar! 🤯",
      })
      .then(atualizarLista);
  }

  return (
    <>
      <h1 className="text-3xl text-slate-100 font-bold text-center">
        Cadastro de pessoas
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
            items={editarLista}
            isLoading={isLoading}
            onClose={() => retornandoEstado()}
            SalvarCadastroEdicao={() => {
              editarLista ? editar() : cadastro();
            }}
          >
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
                    defaultValue={!!editarLista ? editarLista.nome : ""}
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
                    defaultValue={!!editarLista ? editarLista.idade : ""}
                  />
                  <label htmlFor="idade" className="label-branco">
                    Idade
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
        {pessoas.map((x) => (
          <Listagem key={x.id} textoPrincipal={x.nome} exibir={exibirLista}>
            <button
              onClick={() => editarItem(x)}
              className="hover:scale-110 transition-transform"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => removerItem(x.id)}
              className="hover:scale-110 transition-transform text-red-400"
            >
              <Trash size={18} color="black" />
            </button>
          </Listagem>
        ))}
      </div>
    </>
  );
}

export default CadastroPessoas;

export interface InfoPessoas {
  id: number;
  nome: string;
  idade: number;
}

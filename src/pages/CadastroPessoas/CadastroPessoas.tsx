import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import { toast } from "react-toastify";
import Listagem from "../../components/Listagem/Listagem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function CadastroPessoas() {
  const [pessoas, setLista] = useState<InfoPessoas[]>([
    {
      id: 1,
      nome: "Jose",
      idade: 5,
    },

    {
      id: 2,
      nome: "Andre",
      idade: 18,
    },

    {
      id: 3,
      nome: "Douglas",
      idade: 22,
    },
  ]);

  const [isOpen, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [exibirLista, setExibirLista] = useState(true);
  const [editarLista, setEditarLista] = useState<InfoPessoas | null>();
  const removerItem = (id: number) => {
    const novaLista = pessoas.filter((x) => x.id != id);

    setLista(novaLista);
  };

  const editarItem = (item: InfoPessoas) => {
    setEditarLista(item);
    setOpenModal(true);
  };

  function retornandoEstado() {
    setEditarLista(null);
    setOpenModal(false);
  }

  function editar(editar: InfoPessoas) {
    console.log(editar);
    const x = () => new Promise((x) => setTimeout(x, 2000));

    toast.promise(x, {
      pending: {
        render(x) {
          setLoading(true);
          return "I'm loading";
        },
        icon: false,
      },
      success: {
        render() {
          setLoading(false);
          return "Cadastro feito com sucesso!";
        },
      },
      error: {
        render() {
          setLoading(false);
          return "Cadastro Rejeitado! 🤯";
        },
      },
    });
  }

  function cadastro(cadastro: InfoPessoas) {
    const x = () => new Promise((x) => setTimeout(x, 2000));

    toast.promise(x, {
      pending: {
        render(x) {
          setLoading(true);
          return "I'm loading";
        },
        icon: false,
      },
      success: {
        render() {
          setLoading(false);
          return "Success";
        },
      },
      error: {
        render() {
          setLoading(false);
          return "Cadastro Rejeitado! 🤯";
        },
      },
    });

    const validacaoDeId = pessoas.filter((x) => cadastro.id != x.id);

    if (validacaoDeId) {
      const novoArray = [...pessoas, cadastro];
      setLista(novoArray);
    }
  }

  return (
    <>
      <h1 className="text-3xl text-slate-100 font-bold text-center">
        Cadastro de pessoas
      </h1>
      <div className="flex gap-5 mt-5 ">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-slate-700  text-white p-2 rounded-md"
        >
          Criação
        </button>
        <Modal
          titulo="de pessoas"
          isOpen={isOpen}
          items={editarLista}
          isLoading={isLoading}
          onClose={() => retornandoEstado()}
          SalvarCadastroEdicao={(x) => {
            {
              editarLista ? editar(editarLista) : cadastro(x);
            }
          }}
        ></Modal>
        <button
          onClick={() => {
            setExibirLista(!exibirLista);
          }}
          className="bg-slate-700 text-white p-2 rounded-md"
        >
          Listagem
        </button>
      </div>
      <div>
        {pessoas.map((x) => (
          <Listagem key={x.id} textoPrincipal={x.nome} exibir={exibirLista}>
            <button onClick={() => editarItem(x)}>
              <Pencil></Pencil>
            </button>
            <button onClick={() => removerItem(x.id)}>
              <Trash></Trash>
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

export interface Github {
  avatar_url: string;
  login: string;
}

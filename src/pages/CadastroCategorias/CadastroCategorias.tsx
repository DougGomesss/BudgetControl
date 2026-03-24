import { ArrowBigLeft, Calendar } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Listagem from "../../components/Listagem/Listagem";
import Modal from "../../components/Modal/Modal";
import { toast } from "react-toastify";
import Blankstate from "../../components/Blankstate/Blankstate";
import { Contexto } from "../../providers/FamilyBudgetProvider";
import { InfoCategorias } from "../../Interfaces/InfoCategorias";
import { categoriaService } from "../../services/categoriaService";

function CadastroCategorias() {
  const { categorias: categorias_list, atualizarCategorias } =
    useContext(Contexto);
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [is_loading, set_is_loading] = useState(false);
  const descricao_ref = useRef<HTMLInputElement>(null);
  const finalidade_ref = useRef<HTMLInputElement>(null);

  function fechar_modal() {
    set_is_modal_open(false);
  }

  async function handle_submit() {
    const descricao = descricao_ref.current?.value;
    const finalidade = finalidade_ref.current?.value;

    if (!descricao || !finalidade) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const payload: Omit<InfoCategorias, "id"> = {
      descricao,
      finalidade,
    };

    const ja_existe = categorias_list.some(
      (c) => c.descricao.toLowerCase() === payload.descricao.toLowerCase(),
    );

    if (ja_existe) {
      toast.error("Descrição já cadastrada!");
      return;
    }

    set_is_loading(true);

    try {
      await categoriaService.create(payload);
      toast.success("Cadastrado com sucesso!");
      await atualizarCategorias();
    } catch (error) {
      toast.error("Erro ao cadastrar! 🤯");
    } finally {
      set_is_loading(false);
    }
  }

  return (
    <>
      <h1 className="text-3xl text-slate-100 font-bold text-center">
        Cadastro de Categorias
      </h1>
      <div className="flex justify-between text-center mt-5">
        <div className="flex gap-5">
          <button
            onClick={() => set_is_modal_open(true)}
            className="bg-slate-700 text-white p-2 rounded-md hover:bg-slate-600 transition-colors"
          >
            Criação
          </button>
          <Modal
            titulo="de categoria"
            isOpen={is_modal_open}
            items={null}
            isLoading={is_loading}
            onClose={() => fechar_modal()}
            SalvarCadastroEdicao={() => handle_submit()}
          >
            <form
              className="flex flex-col gap-2 p-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-4 w-full">
                <div className="grupo-flutuante">
                  <input
                    ref={descricao_ref}
                    type="text"
                    id="descricao"
                    className="input-branco"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="descricao" className="label-branco">
                    Descrição
                  </label>
                </div>
                <div className="grupo-flutuante">
                  <input
                    ref={finalidade_ref}
                    type="text"
                    id="finalidade"
                    className="input-branco"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="finalidade" className="label-branco">
                    Finalidade
                  </label>
                </div>
              </div>
            </form>
          </Modal>
        </div>
        <button className="bg-slate-700 text-white p-2 rounded-md hover:bg-slate-600 transition-colors">
          <Link to={"/"}>
            <ArrowBigLeft />
          </Link>
        </button>
      </div>

      <div className="mt-5 overflow-y-auto max-h-[700px] pr-2">
        {categorias_list.length === 0 && (
          <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Blankstate texto={`categorias`}>
              <Calendar size={50} />
            </Blankstate>
          </div>
        )}
        {categorias_list.map((categoria) => (
          <Listagem
            key={categoria.id}
            textoPrincipal={`${categoria.descricao} - ${categoria.finalidade}`}
          ></Listagem>
        ))}
      </div>
    </>
  );
}

export default CadastroCategorias;

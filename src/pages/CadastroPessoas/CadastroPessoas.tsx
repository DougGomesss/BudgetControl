import { ArrowBigLeft, Pencil, Trash, User } from "lucide-react";
import { useContext, useRef, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { toast } from "react-toastify";
import Listagem from "../../components/Listagem/Listagem";
import { Link } from "react-router-dom";
import Blankstate from "../../components/Blankstate/Blankstate";
import { Contexto } from "../../providers/FamilyBudgetProvider";
import { InfoPessoas } from "../../Interfaces/InfoPessoas";
import { pessoaService } from "../../services/pessoaService";

function CadastroPessoas() {
  const { usuarios: pessoas_list, atualizarUsuarios } = useContext(Contexto);
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [is_loading, set_is_loading] = useState(false);
  const [item_para_editar, set_item_para_editar] = useState<InfoPessoas | null>(
    null,
  );

  const nome_ref = useRef<HTMLInputElement>(null);
  const idade_ref = useRef<HTMLInputElement>(null);

  const remover_item = async (id: number) => {
    await pessoaService.delete(id);
    toast.success("Pessoa removida com sucesso!");
    atualizarUsuarios();
  };

  const editar_item = (item: InfoPessoas) => {
    set_item_para_editar(item);
    set_is_modal_open(true);
  };

  function fechar_modal() {
    set_is_modal_open(false);
    set_item_para_editar(null);
  }

  async function handle_submit() {
    const idade = idade_ref.current?.valueAsNumber;
    const nome = nome_ref.current?.value;

    if (idade !== undefined && (idade < 0 || idade >= 120)) {
      toast.error("Digite uma idade válida!");
      return;
    }

    if (!nome || idade === undefined) {
      toast.error("Preencha todos os campos!");
      return;
    }

    set_is_loading(true);

    try {
      if (item_para_editar) {
        await pessoaService.update(item_para_editar.id, {
          ...item_para_editar,
          nome,
          idade,
        });
        toast.success("Cadastro atualizado!");
      } else {
        await pessoaService.create({ nome, idade });
        toast.success("Cadastrado com sucesso!");
      }
      await atualizarUsuarios();
    } catch (error) {
      toast.error("Erro ao processar! 🤯");
    } finally {
      set_is_loading(false);
    }
  }

  return (
    <>
      <div>
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Cadastro de Pessoas
        </h1>
        <div className="flex justify-between text-center mt-5">
          <div className="flex gap-5">
            <button
              onClick={() => set_is_modal_open(true)}
              className="bg-slate-700 text-white p-2 rounded-md hover:bg-slate-600 transition-colors"
            >
              Cadastrar pessoa
            </button>
            <Modal
              titulo="de pessoa"
              isOpen={is_modal_open}
              items={item_para_editar}
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
                      ref={nome_ref}
                      type="text"
                      id="nome"
                      className="input-branco"
                      placeholder=" "
                      required
                      defaultValue={item_para_editar?.nome || ""}
                    />
                    <label htmlFor="nome" className="label-branco">
                      Nome Completo
                    </label>
                  </div>
                  <div className="grupo-flutuante">
                    <input
                      ref={idade_ref}
                      type="number"
                      id="idade"
                      className="input-branco"
                      placeholder=" "
                      required
                      defaultValue={item_para_editar?.idade || ""}
                    />
                    <label htmlFor="idade" className="label-branco">
                      Idade
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
          {pessoas_list.length === 0 && (
            <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Blankstate texto="pessoas">
                <User size={50}></User>
              </Blankstate>
            </div>
          )}
          {pessoas_list.map((pessoa) => (
            <Listagem key={pessoa.id} textoPrincipal={pessoa.nome}>
              <button
                onClick={() => editar_item(pessoa)}
                className="hover:scale-110 transition-transform"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => remover_item(pessoa.id)}
                className="hover:scale-110 transition-transform text-red-400"
              >
                <Trash size={18} color="black" />
              </button>
            </Listagem>
          ))}
        </div>
      </div>
    </>
  );
}

export default CadastroPessoas;

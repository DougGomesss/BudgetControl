import { ArrowBigLeft, LogOut } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Listagem from "../../components/Listagem/Listagem";
import Modal from "../../components/Modal/Modal";
import Dropdown from "../../components/Dropdown/Dropdown";
import Blankstate from "../../components/Blankstate/Blankstate";
import { Contexto } from "../../providers/FamilyBudgetProvider";
import { InfoTransacoes } from "../../Interfaces/InfoTransacoes";
import { InfoPessoas } from "../../Interfaces/InfoPessoas";
import { toast } from "react-toastify";
import { InfoCategorias } from "../../Interfaces/InfoCategorias";
import { transacaoService } from "../../services/transacaoService";
import { currencyMask } from "../../utils/currencyMask";

function CadastroTransacoes() {
  const [transacoes_list, set_transacoes_list] = useState<InfoTransacoes[]>([]);
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [is_loading, set_is_loading] = useState(false);
  const consumo_contexto = useContext(Contexto);

  const descricao_ref = useRef<HTMLInputElement>(null);
  const valor_ref = useRef<HTMLInputElement>(null);

  const [categoria_selecionada, set_categoria_selecionada] =
    useState<InfoCategorias | null>(null);
  const [pessoa_selecionada, set_pessoa_selecionada] =
    useState<InfoPessoas | null>(null);

  useEffect(() => {
    carregarTransacoes();
  }, []);

  async function carregarTransacoes() {
    const data = await transacaoService.getAll();
    set_transacoes_list(data);
  }

  function fechar_modal() {
    set_is_modal_open(false);
    set_categoria_selecionada(null);
    set_pessoa_selecionada(null);
    if (descricao_ref.current) descricao_ref.current.value = "";
    if (valor_ref.current) valor_ref.current.value = "";
  }

  const handle_valor_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = currencyMask(e.target.value);
  };

  async function handle_submit() {
    const descricao = descricao_ref.current?.value;
    const valor = valor_ref.current?.value;

    if (!descricao || !valor || !categoria_selecionada || !pessoa_selecionada) {
      toast.error("Preencha todos os campos e selecione Categoria e Pessoa!");
      return;
    }

    set_is_loading(true);

    const nova_transacao: Omit<InfoTransacoes, "id"> = {
      descricao: descricao,
      valor: valor,
      tipoTransacao:
        pessoa_selecionada.idade < 18
          ? "Despesas"
          : categoria_selecionada.finalidade,
      categoria: categoria_selecionada,
      pessoa: pessoa_selecionada,
    };

    try {
      await transacaoService.create(nova_transacao);
      toast.success("Cadastrado com sucesso!");
      await carregarTransacoes();
      fechar_modal();
    } catch (error) {
      toast.error("Erro ao cadastrar! 🤯");
    } finally {
      set_is_loading(false);
    }
  }

  return (
    <>
      <h1 className="text-3xl text-slate-100 font-bold text-center">
        Cadastro de Transações
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
            titulo="de transação"
            isOpen={is_modal_open}
            items={null}
            isLoading={is_loading}
            onClose={() => fechar_modal()}
            SalvarCadastroEdicao={() => handle_submit()}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-4 p-4">
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
                    ref={valor_ref}
                    type="text"
                    id="valor"
                    className="input-branco"
                    placeholder=" "
                    required
                    onChange={handle_valor_change}
                  />
                  <label htmlFor="valor" className="label-branco">
                    Valor
                  </label>
                </div>

                <Dropdown
                  isDisabled={false}
                  descricaoDropdown={
                    pessoa_selecionada?.nome || "Selecione a Pessoa"
                  }
                >
                  {consumo_contexto.usuarios.map((usuario) => (
                    <button
                      key={usuario.id}
                      type="button"
                      onClick={() => set_pessoa_selecionada(usuario)}
                      className="w-full text-left bg-gray-800 hover:bg-sky-700 p-2 rounded-md text-white mb-1"
                    >
                      {usuario.nome}
                    </button>
                  ))}
                </Dropdown>

                <Dropdown
                  descricaoDropdown={
                    categoria_selecionada?.descricao || "Selecione a Categoria"
                  }
                  isDisabled={false}
                >
                  {consumo_contexto.categorias.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => set_categoria_selecionada(cat)}
                      className="w-full text-left bg-gray-800 hover:bg-sky-700 p-2 rounded-md text-white mb-1"
                    >
                      {cat.descricao}
                    </button>
                  ))}
                </Dropdown>
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
        {transacoes_list.length === 0 && (
          <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Blankstate texto={`transações`}>
              <LogOut size={50} />
            </Blankstate>
          </div>
        )}
        {transacoes_list.map((transacao) => (
          <Listagem
            key={transacao.id}
            textoPrincipal={`${transacao.descricao} - ${transacao.valor} (${transacao.pessoa.nome} | Tipo: ${transacao.pessoa.idade < 18 ? "Despesa" : `${transacao.categoria.finalidade}`})`}
          ></Listagem>
        ))}
      </div>
    </>
  );
}

export default CadastroTransacoes;

import React, { ReactNode, useEffect, useState } from "react";
import { InfoPessoas } from "../Interfaces/InfoPessoas";
import { InfoCategorias } from "../Interfaces/InfoCategorias";
import { pessoaService } from "../services/pessoaService";
import { categoriaService } from "../services/categoriaService";

interface ContextoData {
  usuarios: InfoPessoas[];
  categorias: InfoCategorias[];
  atualizarUsuarios: () => Promise<void>;
  atualizarCategorias: () => Promise<void>;
}

export const Contexto = React.createContext<ContextoData>({
  usuarios: [],
  categorias: [],
  atualizarUsuarios: async () => {},
  atualizarCategorias: async () => {},
});

interface Props {
  children: ReactNode;
}

function FamilyBudgetProvider({ children }: Props) {
  const [usuarios_list, set_usuarios_list] = useState<InfoPessoas[]>([]);
  const [categorias_list, set_categorias_list] = useState<InfoCategorias[]>([]);

  const carregar_dados_iniciais = async () => {
    const [pessoas, categorias] = await Promise.all([
      pessoaService.getAll(),
      categoriaService.getAll(),
    ]);
    set_usuarios_list(pessoas);
    set_categorias_list(categorias);
  };

  const atualizar_usuarios = async () => {
    const pessoas = await pessoaService.getAll();
    set_usuarios_list(pessoas);
  };

  const atualizar_categorias = async () => {
    const categorias = await categoriaService.getAll();
    set_categorias_list(categorias);
  };

  useEffect(() => {
    carregar_dados_iniciais();
  }, []);

  return (
    <Contexto.Provider
      value={{
        usuarios: usuarios_list,
        categorias: categorias_list,
        atualizarUsuarios: atualizar_usuarios,
        atualizarCategorias: atualizar_categorias,
      }}
    >
      {children}
    </Contexto.Provider>
  );
}

export default FamilyBudgetProvider;

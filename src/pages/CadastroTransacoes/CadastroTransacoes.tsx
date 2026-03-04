function CadastroTransacoes() {
  return <p>Cadastro de Transações</p>;
}

export default CadastroTransacoes;

export interface InfoTransacoes {
  identificador: number;
  valor: number;
  tipo: string;
  categoria: boolean;
  pessoa: any; // (identificador da pessoa do cadastro anterior);
}

// get put delete post

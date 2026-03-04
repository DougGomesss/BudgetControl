function CadastroCategorias() {
  return (
    <div className="cadastro-categorias">
      <h1>Cadastro de Categorias</h1>
      {/* Formulário de cadastro de categorias */}
    </div>
  );
}

export default CadastroCategorias;

export interface InfoCategorias {
  identificador: number;
  descricao: string;
  Familiaridade: string[]; //dropdown
}

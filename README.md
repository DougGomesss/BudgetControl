# FamilyBudget - Controle de Gastos Residenciais

Este projeto é um sistema para gerenciamento de finanças domésticas, permitindo o controle de pessoas, categorias de despesas/receitas e o registro detalhado de transações financeiras.

## 📋 Proposta do Projeto

O objetivo é desenvolver uma aplicação Front end ( React ) que resolva o problema de organização de gastos em uma residência, garantindo a integridade dos dados e aplicando regras de negócio específicas para cada funcionalidade.

## 🚀 Funcionalidades Principais

### 1. Cadastro de Pessoas

Gerenciamento completo (CRUD) de moradores ou pessoas vinculadas aos gastos.

- **Campos:** Identificador único (auto), Nome (máx. 200 caracteres) e Idade.
- **Regra de Negócio:** Ao deletar uma pessoa, todas as transações vinculadas a ela devem ser removidas em cascata.

### 2. Cadastro de Categorias

Classificação dos tipos de gastos ou ganhos.

- **Campos:** Identificador único (auto), Descrição (máx. 400 caracteres) e Finalidade.
- **Opções de Finalidade:** Despesa, Receita ou Ambas.

### 3. Cadastro de Transações

Registro dos movimentos financeiros.

- **Campos:** Identificador único (auto), Descrição (máx. 400 caracteres), Valor (numérico positivo), Tipo (Despesa/Receita), Categoria e Pessoa.
- **Regras de Negócio:**
  - **Restrição de Idade:** Se a pessoa for menor de idade (menor de 18 anos), o sistema deve permitir apenas o registro de **Despesas**.
  - **Filtro de Categoria:** A categoria selecionada deve ser compatível com o tipo de transação (ex: não permitir categoria de 'Receita' em uma transação de 'Despesa').

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React.js com TypeScript e Vite.
- **Estilização:** Tailwind CSS e SASS (SCSS) para componentes customizados.
- **Componentes:** Lucide React (ícones), React-Toastify (notificações) e FontAwesome.
- **Gerenciamento de Estado:** React Hooks (useState, useRef, useEffect).

## ⚙️ Comandos do Projeto

O projeto utiliza o `generate-react-cli` para padronização de componentes:

- Criar novo componente: `npx grc component NomeDoComponente`

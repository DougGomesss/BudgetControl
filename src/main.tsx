import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CadastroCategorias from "./pages/CadastroCategorias/CadastroCategorias.tsx";
import App from "./App.tsx";
import Home from "./pages/Home/Home.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import CadastroPessoas from "./pages/CadastroPessoas/CadastroPessoas.tsx";
import CadastroTransacoes from "./pages/CadastroTransacoes/CadastroTransacoes.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categorias",
        element: <CadastroCategorias></CadastroCategorias>,
      },
      {
        path: "/pessoas",
        element: <CadastroPessoas></CadastroPessoas>,
      },
      {
        path: "/transações",
        element: <CadastroTransacoes></CadastroTransacoes>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);

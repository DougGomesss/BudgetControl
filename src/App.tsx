import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
        <div className="w-[1000px] ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;

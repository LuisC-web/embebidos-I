import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <>
      <main className="bg-gray-700 h-screen w-screen">
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default Layout;

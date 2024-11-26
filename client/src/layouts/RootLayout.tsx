import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col relative">
      {/* Header */}
      <main className="flex-1 w-full h-full">
        <Outlet />
      </main>
      {/* Footer */}
    </div>
  );
};

export default RootLayout;

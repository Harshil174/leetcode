import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      {/* Header */}
      <main className="flex-1 w-full h-full">
        <Outlet />
      </main>
      {/* Footer */}
    </>
  );
};

export default RootLayout;

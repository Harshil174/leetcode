import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));

const ProtectedRoute = lazy(() => import("@/components/ProtectedRoute"));

const LandingPage = lazy(() => import("@/features/landing/LandingPage"));
const SignUpForm = lazy(() => import("@/features/auth/SignUpForm"));
const SignInForm = lazy(() => import("@/features/auth/SignInForm"));

const DashboardPage = lazy(() => import("@/features/dashboard/DashboardPage"));

import LoadingSpinner from "@/components/LoadingSpinner";
import ProblemPage from "@/features/problems/problem/ProblemPage";

const App = () => {
  const router = createBrowserRouter([
    { path: "/auth/sign-up", element: <SignUpForm /> },
    { path: "/auth/sign-in", element: <SignInForm /> },
    {
      element: <RootLayout />,
      children: [
        // public routes
        { path: "/", element: <LandingPage /> },

        // private routes
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/problem/:problemId",
          element: (
            <ProtectedRoute>
              <ProblemPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="w-full h-screen flex flex-col relative overflow-x-hidden">
        <RouterProvider router={router} />
      </div>
    </Suspense>
  );
};

export default App;

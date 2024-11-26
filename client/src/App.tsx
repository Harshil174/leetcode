import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));

const ProtectedRoute = lazy(() => import("@/components/ProtectedRoute"));

const LandingPage = lazy(() => import("@/features/landing/LandingPage"));
const SignUp = lazy(() => import("@/features/auth/SignUpForm"));
const SignInForm = lazy(() => import("@/features/auth/SignInForm"));

const DashboardPage = lazy(() => import("@/features/dashboard/DashboardPage"));

import LoadingSpinner from "@/components/LoadingSpinner";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        // public routes
        { path: "/", element: <LandingPage /> },
        { path: "/auth/sign-up", element: <SignUp /> },
        { path: "/auth/sign-in", element: <SignInForm /> },

        // private routes
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;

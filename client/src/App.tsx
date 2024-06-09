import { Provider as StateProvider } from "jotai";
import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { Toaster } from "@/components/ui/toaster";
import { HomePage } from "@/modules/home/home.page";
import { LoginPage } from "@/modules/auth/login/login.page";
import { SignupPage } from "@/modules/auth/signup/signup.page";
import { store } from "@/store";
import { GlobalErrorBoundry } from "@/components/global-error-boundry";
import { queryClient } from "@/lib/query";

function App() {
  return (
    <ErrorBoundary fallback={<GlobalErrorBoundry />}>
      <StateProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </QueryClientProvider>
        <Toaster />
      </StateProvider>
    </ErrorBoundary>
  );
}

export default App;

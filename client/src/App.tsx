import { Provider as StateProvider } from "jotai";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { HomePage } from "@/modules/home/home.page";
import { LoginPage } from "@/modules/auth/login/login.page";
import { SignupPage } from "@/modules/auth/signup/signup.page";
import { store } from "@/store";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
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
  );
}

export default App;

import { Provider as StateProvider } from "jotai";
import { Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { HomePage } from "@/modules/home/home.page";
import { LoginPage } from "@/modules/auth/login/login.page";
import { SignupPage } from "@/modules/auth/signup/signup.page";
import { store } from "@/store";

function App() {
  return (
    <StateProvider store={store}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Toaster />
    </StateProvider>
  );
}

export default App;

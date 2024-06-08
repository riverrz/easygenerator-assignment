import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { HomePage } from "@/modules/home/home.page";
import { LoginPage } from "@/modules/auth/login/login.page";
import { SignupPage } from "@/modules/auth/signup/signup.page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Navigation from "components/navigation/Navigation";
import LoginPage from "pages/Auth/LoginPage";
import HomePage from "pages/HomePage";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;

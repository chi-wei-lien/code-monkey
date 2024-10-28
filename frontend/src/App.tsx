import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AddQuestion from "./pages/AddQuestionPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditQuestionPage from "./pages/EditQuestionPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add-question" element={<AddQuestion />} />
      <Route path="/edit-question" element={<EditQuestionPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;

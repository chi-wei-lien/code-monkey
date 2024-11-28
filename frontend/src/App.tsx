import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AddQuestion from "./pages/AddQuestionPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditQuestionPage from "./pages/EditQuestionPage";
import AddSolutionPage from "./pages/AddSolutionPage";
import EditSolutionPage from "./pages/EditSolutionPage";
import SolutionsPage from "./pages/SolutionsPage";
import SolutionPage from "./pages/SolutionPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/question/:q_id/solutions" element={<SolutionsPage />} />
      <Route path="/question/:q_id/solution/:s_id" element={<SolutionPage />} />
      <Route path="/add-question" element={<AddQuestion />} />
      <Route path="/add-solution/:q_id" element={<AddSolutionPage />} />
      <Route path="/edit-solution/:s_id" element={<EditSolutionPage />} />
      <Route path="/edit-question/:q_id" element={<EditQuestionPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;

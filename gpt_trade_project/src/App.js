import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CTAPage from "./pages/CTAPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cta" element={<CTAPage />} />
      </Routes>
    </Router>
  );
}

export default App;

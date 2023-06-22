import {BrowserRouter, Routes, Route} from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<OverviewPage />} />
          
        <Route path="/detail/:symbol" element={<DetailPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;

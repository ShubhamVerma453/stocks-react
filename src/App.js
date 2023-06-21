import {BrowserRouter, Routes, Route} from "react-router-dom";
import OverviewPage from "./components/OverviewPage";
import DetailPage from "./components/DetailPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<OverviewPage />} />
          
        <Route path="/path2" element={<DetailPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;

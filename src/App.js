import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context";
import OverviewPage from "./pages/OverviewPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<OverviewPage />} />

          <Route path="/detail/:symbol" element={<DetailPage />} />
        </Routes>

      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

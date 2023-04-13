import { BrowserRouter, Route, Routes } from "react-router-dom";
import Identify from "./View/IdentifyView";
import AuthProvider from "./contexts/AuthContext";
import AppLayout from "./Layout/AppLayout";
import MatchesView from "./View/MatchesView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<h2>Hello Home</h2>} />
            <Route path="identify" element={<Identify />} />
            <Route path="/matches" element={<MatchesView/>} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

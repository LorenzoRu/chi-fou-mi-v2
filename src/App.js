import { BrowserRouter, Route, Routes } from "react-router-dom";
import Identify from "./View/IdentifyView";
import AuthProvider from "./contexts/AuthContext";
import AppLayout from "./Layout/AppLayout";
import MatchesView from "./View/MatchesView";
import MatchProvider from "./contexts/MatchContext";
import MatchView from "./View/MatchView";
import "./css/main.css";
import EventProvider from "./contexts/EventContext";
import Home from "./View/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <MatchProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="identify" element={<Identify />} />
               <Route path="matches" element={<MatchesView/>} />
            <Route path="matches/:id" element={<EventProvider><MatchView/></EventProvider>} / >
            </Route>
          </Routes>  
          </MatchProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/dashboard/Home";
import { CreateBanner } from "./components/dashboard/banner/CreateBanner";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/createBanner" element={<CreateBanner />} />
          <Route path="register" element={"<Register />"} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

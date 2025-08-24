import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Layout from "./pages/layout/layout";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >

        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

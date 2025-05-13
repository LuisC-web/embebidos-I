import { BrowserRouter, Route, Routes } from "react-router-dom";
import View3D from "./pages/View3D";
import JoyStick from "./pages/JoyStick";
import Layout from "./layout/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route path="/" element={<JoyStick></JoyStick>} index></Route>
          <Route path="/view3d" element={<View3D></View3D>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

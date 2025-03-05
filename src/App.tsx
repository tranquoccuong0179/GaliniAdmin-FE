// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import AdminLayouts from "./layouts/AdminLayout";
import { Listener } from "./pages/Listener";
import { ToastContainer } from "react-toastify";
import { AddBlog } from "./pages/AddBlog";
import { AddListener } from "./pages/AddListener";
// import AdminLayouts from './layouts/AdminLayout'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/home"
            element={
              <AdminLayouts>
                <Home />
              </AdminLayouts>
            }
          />
          <Route
            path="/listener"
            element={
              <AdminLayouts>
                <Listener />
              </AdminLayouts>
            }
          />
          <Route
            path="/listener/add"
            element={
              <AdminLayouts>
                <AddListener />
              </AdminLayouts>
            }
          />
          <Route
            path="/blog/add"
            element={
              <AdminLayouts>
                <AddBlog />
              </AdminLayouts>
            }
          />

          <Route path="/logout" />
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

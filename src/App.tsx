// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import AdminLayouts from "./layouts/AdminLayout";
import { Listener } from "./pages/Listener";
import { ToastContainer } from "react-toastify";
import { AddBlog } from "./pages/AddBlog";
import { AddListener } from "./pages/AddListener";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import { Premium } from "./pages/Premium";
import { Transaction } from "./pages/Transaction";
import { AddPremium } from "./pages/AddPremium";
import { User } from "./pages/User";
// import AdminLayouts from './layouts/AdminLayout'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <AdminLayouts>
                <Dashboard />
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
            path="/user"
            element={
              <AdminLayouts>
                <User />
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
            path="/premium"
            element={
              <AdminLayouts>
                <Premium />
              </AdminLayouts>
            }
          />
          <Route
            path="/premium/add"
            element={
              <AdminLayouts>
                <AddPremium />
              </AdminLayouts>
            }
          />
          <Route
            path="/transaction"
            element={
              <AdminLayouts>
                <Transaction />
              </AdminLayouts>
            }
          />
          <Route
            path="/blog"
            element={
              <AdminLayouts>
                <Blog />
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
          <Route
            path="/blog/:id"
            element={
              <AdminLayouts>
                <BlogDetail />
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

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import UserMenu from "./pages/user/UserMenu"

import AdminLogin from "./pages/admin/AdminLogin"

import AdminDashboard from "./pages/admin/AdminDashboard"

import AddMenu from "./pages/admin/AddMenu"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<UserMenu />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/add-menu"
          element={<AddMenu />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
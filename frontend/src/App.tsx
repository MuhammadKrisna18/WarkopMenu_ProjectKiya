import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import UserMenu from "./pages/UserMenu"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
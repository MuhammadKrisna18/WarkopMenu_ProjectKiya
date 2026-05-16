import { useState } from "react"

import axios from "axios"

import {
  useNavigate
} from "react-router-dom"

function AdminLogin() {

  const navigate = useNavigate()

  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  const validatePassword = (
    password: string
  ) => {

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    return regex.test(password)
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    if (
      !validatePassword(password)
    ) {

      alert(
        "Password minimal 8 karakter, mengandung huruf besar, kecil, dan angka"
      )

      return
    }

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/admin/login",
        {
          username,
          password
        }
      )

      const token =
        response.data.access_token

      localStorage.setItem(
        "token",
        token
      )

      navigate(
        "/admin/dashboard"
      )

    } catch (error: any) {

      alert(
        error.response?.data?.detail ||
        "Login gagal"
      )
    }
  }

  return (

    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl"
      >

        <h1 className="text-4xl font-bold text-white mb-2">
          Admin Login
        </h1>

        <p className="text-zinc-400 mb-8">
          Login untuk mengelola menu cafe
        </p>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white outline-none focus:border-amber-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white outline-none focus:border-amber-400"
          />

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-4 rounded-xl transition-all duration-300"
          >
            Login
          </button>

        </div>

      </form>

    </div>

  )
}

export default AdminLogin
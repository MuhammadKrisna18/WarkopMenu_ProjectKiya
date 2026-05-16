import { useState } from "react"

function AdminLogin() {
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

  const handleSubmit = (
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

    alert("Login UI Ready")
  }

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <h1>Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
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
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
import { useState } from "react"

function Login({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    const success = onLogin(username, password)
    if (!success) setError("Username atau password salah! ❌")
    else setError("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-96 border border-pink-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-pink-500 mb-1">Hearts2Hearts</h1>
          <p className="text-gray-400 text-sm">Sign in to trade your photocard 💌</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl text-center mb-4 font-medium">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-pink-400 transition-colors text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-pink-400 transition-colors text-sm"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold hover:bg-pink-600 transition-colors shadow-md shadow-pink-100 mt-1"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
import { useState } from "react"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Buy from "./pages/Buy"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [page, setPage] = useState("home")
  const [selectedItem, setSelectedItem] = useState(null)

  const handleLogin = (username, password) => {
    if (username === "anne" && password === "annepw") {
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setPage("home")
    setSelectedItem(null)
  }

  const goToBuy = (item) => {
    setSelectedItem(item)
    setPage("buy")
  }

  if (!isLoggedIn) return <Login onLogin={handleLogin} />

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-pink-100 px-6 py-3 flex items-center justify-between shadow-sm">
        <span
          onClick={() => setPage("home")}
          className="text-xl font-extrabold text-pink-500 cursor-pointer tracking-tight"
        >
          Hearts2Hearts ♡
        </span>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setPage("home")}
            className={`text-sm font-semibold transition-colors ${
              page === "home" ? "text-pink-500" : "text-gray-400 hover:text-pink-400"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setPage("catalog")}
            className={`text-sm font-semibold transition-colors ${
              page === "catalog" || page === "buy" ? "text-pink-500" : "text-gray-400 hover:text-pink-400"
            }`}
          >
            Catalog
          </button>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-gray-400 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {page === "home" && <Home onGoToCatalog={() => setPage("catalog")} />}
      {page === "catalog" && <Catalog onBuy={goToBuy} />}
      {page === "buy" && (
        <Buy
          item={selectedItem}
          onBack={() => setPage("catalog")}
          onBackToBuy={(item) => goToBuy(item)}
        />
      )}
    </>
  )
}

export default App
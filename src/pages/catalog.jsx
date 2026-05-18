import { useEffect, useState } from "react"

const MEMBERS = ["All", "Carmen", "Jiwoo", "Yuha", "Stella", "A-na", "Juun", "I-an", "Ye-on"]

function Catalog({ onBuy }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [memberFilter, setMemberFilter] = useState("All")
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("https://6a0a521d21e445625695ee07.mockapi.io/hearts2hearts-api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  const filtered = products.filter((p) => {
    const matchMember = memberFilter === "All" || p.member === memberFilter
    const matchSearch =
      p.member.toLowerCase().includes(search.toLowerCase())
    return matchMember && matchSearch
  })

  return (
    <div className="min-h-screen bg-pink-50 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl font-extrabold text-pink-500">Photocard Catalog</h1>
            <p className="text-sm text-gray-400 mt-0.5">{filtered.length} photocard tersedia</p>
          </div>
          <input
            type="text"
            placeholder="Cari nama / member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-pink-200 bg-white px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-pink-400 w-full sm:w-52"
          />
        </div>

        {/* Member filter pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {MEMBERS.map((m) => (
            <button
              key={m}
              onClick={() => setMemberFilter(m)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                memberFilter === m
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-gray-500 border-pink-200 hover:border-pink-400 hover:text-pink-400"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center text-pink-400 font-semibold py-20">
            Loading photocards... 🩷
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-300 font-semibold py-20">
            Tidak ada photocard ditemukan.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-pink-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="aspect-[3/4] bg-pink-100 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.member}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${item.id}/300/400`
                    }}
                  />
                  <span className="absolute top-2 left-2 bg-pink-500/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.member}
                  </span>
                </div>
                <div className="p-3 flex flex-col flex-grow justify-between">
                  <p className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-2">
                    {item.member}
                  </p>
                  <div className="pt-2 border-t border-pink-50 flex justify-between items-center">
                    <span className="text-pink-500 font-extrabold text-sm">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </span>
                    <button
                      onClick={() => onBuy(item)}
                      className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Trade
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Catalog
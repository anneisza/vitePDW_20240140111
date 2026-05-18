function Home({ onGoToCatalog }) {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center px-6 text-center">
      {/* Logo / Brand */}
      <div className="mb-6">
        <div className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-200">
          <span className="text-white text-3xl font-extrabold">H2</span>
        </div>
        <h1 className="text-4xl font-extrabold text-pink-500 mb-2">Hearts2Hearts</h1>
        <p className="text-gray-400 text-base max-w-sm mx-auto leading-relaxed">
          Platform jual beli & trade photocard Hearts2Hearts.
          Temukan photocard member favoritmu di sini! 🩷
        </p>
      </div>

      {/* Member pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-md">
        {["Carmen", "Jiwoo", "Yuha", "Stella", "A-na", "Juun", "I-an", "Ye-On"].map((m) => (
          <span
            key={m}
            className="bg-white border border-pink-200 text-pink-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm"
          >
            {m}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onGoToCatalog}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-10 py-3.5 rounded-full transition-colors shadow-lg shadow-pink-200 text-base"
      >
        Browse Catalog →
      </button>
        <br />
      <p className="text-gray-300 text-xs mt-6">Hearts2Hearts · Official Photocard Trading</p>
    </div>
  )
}

export default Home
import { useState } from "react"

const PAYMENT_METHODS = [
  "Transfer Bank (BCA)",
  "Transfer Bank (Mandiri)",
  "Transfer Bank (BRI)",
  "GoPay",
  "OVO",
  "DANA",
  "ShopeePay",
  "QRIS",
]

function Buy({ item, onBack, onBackToBuy }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    zip: "",
    payment: PAYMENT_METHODS[0],
    note: "",
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Nama wajib diisi"
    if (!form.phone.trim()) e.phone = "No. HP wajib diisi"
    if (!form.email.trim()) e.email = "Email wajib diisi"
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Format email tidak valid"
    if (!form.address.trim()) e.address = "Alamat wajib diisi"
    if (!form.city.trim()) e.city = "Kota wajib diisi"
    if (!form.province.trim()) e.province = "Provinsi wajib diisi"
    if (!form.zip.trim()) e.zip = "Kode pos wajib diisi"
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    setSubmitted(true)
  }

  // ── Success page ──────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center px-6 py-10">
        <div className="bg-white rounded-3xl border border-pink-100 shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-3">💌</div>
          <h2 className="text-2xl font-extrabold text-pink-500 mb-1">Pesanan Berhasil!</h2>
          <p className="text-gray-400 text-sm mb-6">
            Terima kasih <span className="font-bold text-gray-600">{form.name}</span>! Cek detail pesananmu di bawah.
          </p>

          {/* Order detail card */}
          <div className="bg-pink-50 rounded-2xl p-5 text-left text-sm space-y-3 mb-6">
            <p className="font-bold text-gray-600 text-xs uppercase tracking-wider mb-1">Detail Pesanan</p>

            <div className="flex gap-3 pb-3 border-b border-pink-100">
              <div className="w-16 h-20 rounded-xl overflow-hidden bg-pink-100 flex-shrink-0">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item?.id}/300/400` }}
                />
              </div>
              <div>
                <p className="font-bold text-gray-800">{item?.name}</p>
                <p className="text-pink-400 font-semibold text-xs mt-0.5">{item?.member}</p>
                <p className="text-pink-500 font-extrabold mt-1">
                  Rp {Number(item?.price).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              {[
                ["Pembeli", form.name],
                ["No. HP", form.phone],
                ["Email", form.email],
                ["Alamat", `${form.address}, ${form.city}, ${form.province} ${form.zip}`],
                ["Pembayaran", form.payment],
                ...(form.note ? [["Catatan", form.note]] : []),
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-2">
                  <span className="text-gray-400 flex-shrink-0">{label}</span>
                  <span className="font-semibold text-gray-700 text-right">{value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-pink-100 pt-3 flex justify-between font-extrabold text-pink-500 text-base">
              <span>Total</span>
              <span>Rp {Number(item?.price).toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onBackToBuy(item)}
              className="flex-1 border border-pink-300 text-pink-500 font-bold py-3 rounded-xl hover:bg-pink-50 transition-colors text-sm"
            >
              Order Lagi
            </button>
            <button
              onClick={onBack}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Ke Katalog
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Checkout form ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-pink-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="text-sm text-pink-400 hover:text-pink-600 font-semibold mb-6 flex items-center gap-1"
        >
          ← Kembali ke Katalog
        </button>

        <h1 className="text-2xl font-extrabold text-pink-500 mb-6">Checkout</h1>

        <div className="grid md:grid-cols-5 gap-6">
          {/* ── Form kiri ── */}
          <div className="md:col-span-3 space-y-4">
            {/* Informasi Pribadi */}
            <div className="bg-white rounded-2xl border border-pink-100 p-5 space-y-3">
              <h2 className="font-bold text-gray-700">Informasi Pembeli</h2>

              <Field label="Nama Lengkap *" error={errors.name}>
                <input
                  type="text"
                  placeholder="Nama lengkapmu"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={input(errors.name)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="No. HP / WA *" error={errors.phone}>
                  <input
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={input(errors.phone)}
                  />
                </Field>
                <Field label="Email *" error={errors.email}>
                  <input
                    type="email"
                    placeholder="email@kamu.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={input(errors.email)}
                  />
                </Field>
              </div>
            </div>

            {/* Alamat */}
            <div className="bg-white rounded-2xl border border-pink-100 p-5 space-y-3">
              <h2 className="font-bold text-gray-700">Alamat Pengiriman</h2>

              <Field label="Alamat Lengkap *" error={errors.address}>
                <textarea
                  placeholder="Jl. ... No. ..., RT/RW ..."
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={2}
                  className={input(errors.address) + " resize-none"}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Kota *" error={errors.city}>
                  <input
                    type="text"
                    placeholder="Jakarta"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={input(errors.city)}
                  />
                </Field>
                <Field label="Provinsi *" error={errors.province}>
                  <input
                    type="text"
                    placeholder="DKI Jakarta"
                    value={form.province}
                    onChange={(e) => handleChange("province", e.target.value)}
                    className={input(errors.province)}
                  />
                </Field>
              </div>

              <Field label="Kode Pos *" error={errors.zip}>
                <input
                  type="text"
                  placeholder="12345"
                  value={form.zip}
                  onChange={(e) => handleChange("zip", e.target.value)}
                  className={input(errors.zip) + " w-32"}
                />
              </Field>
            </div>

            {/* Pembayaran */}
            <div className="bg-white rounded-2xl border border-pink-100 p-5 space-y-3">
              <h2 className="font-bold text-gray-700">Metode Pembayaran</h2>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => handleChange("payment", m)}
                    className={`border rounded-xl py-2.5 px-3 text-xs font-semibold transition-colors text-left ${
                      form.payment === m
                        ? "border-pink-500 bg-pink-50 text-pink-600"
                        : "border-gray-200 text-gray-500 hover:border-pink-300"
                    }`}
                  >
                    {form.payment === m && <span className="mr-1">✓</span>}
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Catatan */}
            <div className="bg-white rounded-2xl border border-pink-100 p-5">
              <Field label="Catatan (opsional)">
                <textarea
                  placeholder="Ada permintaan khusus? Tulis di sini..."
                  value={form.note}
                  onChange={(e) => handleChange("note", e.target.value)}
                  rows={2}
                  className={input() + " resize-none"}
                />
              </Field>
            </div>
          </div>

          {/* ── Order summary kanan ── */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-pink-100 p-5 sticky top-20">
              <h2 className="font-bold text-gray-700 mb-4">Ringkasan Order</h2>
              {item && (
                <>
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-pink-100 mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://picsum.photos/seed/${item.id}/300/400`
                      }}
                    />
                  </div>
                  <p className="font-bold text-gray-800 text-sm leading-snug">{item.name}</p>
                  <p className="text-xs text-pink-400 font-semibold mt-0.5 mb-4">{item.member}</p>

                  <div className="space-y-2 text-sm border-t border-pink-50 pt-3">
                    <div className="flex justify-between text-gray-400">
                      <span>Harga</span>
                      <span>Rp {Number(item.price).toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Ongkir</span>
                      <span className="text-green-500 font-semibold">Gratis</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-pink-500 text-base pt-2 border-t border-pink-50">
                      <span>Total</span>
                      <span>Rp {Number(item.price).toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={handleSubmit}
                className="w-full mt-5 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md shadow-pink-100 text-sm"
              >
                Konfirmasi Order 💌
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper components
function Field({ label, error, children }) {
  return (
    <div>
      {label && <label className="text-xs font-semibold text-gray-500 mb-1 block">{label}</label>}
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

function input(hasError) {
  return `w-full border px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors ${
    hasError ? "border-red-300 bg-red-50" : "border-gray-200"
  }`
}

export default Buy
import { useState } from "react"

import axios from "axios"

type Props = {
  id: number
  name: string
  description: string
  stock: number
  image: string | null
}

function MenuCard({
  id,
  name,
  description,
  stock,
  image
}: Props) {

  const [qty, setQty] =
    useState(1)

  const [currentStock, setCurrentStock] =
    useState(stock)

  const buyMenu = async () => {

    try {

      const formData = new FormData()

      formData.append(
        "qty",
        qty.toString()
      )

      const response = await axios.post(
        `http://127.0.0.1:8000/menu/buy/${id}`,
        formData
      )

      setCurrentStock(
        response.data.remaining_stock
      )

      alert("Pembelian berhasil")

    } catch (error: any) {

      alert(
        error.response?.data?.detail ||
        "Gagal membeli"
      )
    }
  }

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-all duration-300">

      {image && (

        <img
          src={`http://127.0.0.1:8000/uploads/${image}`}
          alt={name}
          className="w-full h-60 object-cover"
        />

      )}

      <div className="p-5">

        <h3 className="text-2xl font-bold text-white mb-2">
          {name}
        </h3>

        <p className="text-zinc-400 mb-4 leading-relaxed">
          {description}
        </p>

        {currentStock > 0 ? (

          <>

            <div className="flex items-center justify-between mb-4">

              <p className="text-amber-400 font-semibold">
                Stock: {currentStock}
              </p>

            </div>

            <input
              type="number"
              min={1}
              max={currentStock}
              value={qty}
              onChange={(e) =>
                setQty(
                  Number(e.target.value)
                )
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white mb-4 outline-none focus:border-amber-400"
            />

            <button
              onClick={buyMenu}
              className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-3 rounded-xl transition-all duration-300"
            >
              Beli Menu
            </button>

          </>

        ) : (

          <div className="bg-red-500/20 border border-red-500 text-red-400 rounded-xl py-3 text-center font-bold">
            MENU HABIS
          </div>

        )}

      </div>

    </div>

  )
}

export default MenuCard
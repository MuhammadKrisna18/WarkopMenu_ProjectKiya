import { useState } from "react"

import axios from "axios"

function AddMenu() {

  const [name, setName] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [totalStock, setTotalStock] =
    useState(0)

  const [additionalMenu, setAdditionalMenu] =
    useState("")

  const [image, setImage] =
    useState<File | null>(null)

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      const formData = new FormData()

      formData.append(
        "name",
        name
      )

      formData.append(
        "description",
        description
      )

      formData.append(
        "total_stock",
        totalStock.toString()
      )

      formData.append(
        "additional_menu",
        additionalMenu
      )

      if (image) {

        formData.append(
          "image",
          image
        )
      }

      await axios.post(
        "http://127.0.0.1:8000/menu/create",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      )

      alert("Menu berhasil ditambahkan")

    } catch (error) {

      console.log(error)

      alert("Gagal tambah menu")
    }
  }

  return (

    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 py-10">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-5"
      >

        <h1 className="text-4xl font-bold text-white">
          Tambah Menu
        </h1>

        <input
          type="text"
          placeholder="Nama Menu"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white outline-none focus:border-amber-400"
        />

        <textarea
          placeholder="Deskripsi Menu"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white h-40 outline-none focus:border-amber-400"
        />

        <input
          type="number"
          placeholder="Total Stock"
          value={totalStock}
          onChange={(e) =>
            setTotalStock(
              Number(e.target.value)
            )
          }
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white outline-none focus:border-amber-400"
        />

        <input
          type="text"
          placeholder="Tambahan Menu"
          value={additionalMenu}
          onChange={(e) =>
            setAdditionalMenu(
              e.target.value
            )
          }
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white outline-none focus:border-amber-400"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {

            if (e.target.files) {

              setImage(
                e.target.files[0]
              )
            }
          }}
          className="w-full text-zinc-300"
        />

        <button
          type="submit"
          className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-4 rounded-xl transition-all duration-300"
        >
          Tambah Menu
        </button>

      </form>

    </div>

  )
}

export default AddMenu
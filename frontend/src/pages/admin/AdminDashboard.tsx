import { useEffect, useState } from "react"

import axios from "axios"

import { useNavigate } from "react-router-dom"

type Menu = {
  id: number
  name: string
  image: string | null
  description: string
  total_stock: number
  additional_menu: string | null
}

function AdminDashboard() {

  const navigate = useNavigate()

  const [menus, setMenus] =
    useState<Menu[]>([])

  const [selectedMenu, setSelectedMenu] =
    useState<Menu | null>(null)

  const [editName, setEditName] =
    useState("")

  const [editDescription, setEditDescription] =
    useState("")

  const [editAdditionalMenu, setEditAdditionalMenu] =
    useState("")

  const [stockToAdd, setStockToAdd] =
    useState(0)

  const fetchMenus = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/menu"
      )

      setMenus(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMenus()
  }, [])

  const openDetail = (
    menu: Menu
  ) => {

    setSelectedMenu(menu)

    setEditName(menu.name)

    setEditDescription(
      menu.description
    )

    setEditAdditionalMenu(
      menu.additional_menu || ""
    )
  }

  const editMenu = async () => {

    if (!selectedMenu) return

    try {

      const formData = new FormData()

      formData.append("name", editName)

      formData.append(
        "description",
        editDescription
      )

      formData.append(
        "additional_menu",
        editAdditionalMenu
      )

      await axios.put(
        `http://127.0.0.1:8000/menu/edit/${selectedMenu.id}`,
        formData
      )

      alert("Menu berhasil diupdate")

      fetchMenus()

    } catch (error) {

      console.log(error)
    }
  }

  const addStock = async () => {

    if (!selectedMenu) return

    try {

      const formData = new FormData()

      formData.append(
        "stock",
        stockToAdd.toString()
      )

      await axios.put(
        `http://127.0.0.1:8000/menu/add-stock/${selectedMenu.id}`,
        formData
      )

      alert("Stock berhasil ditambahkan")

      fetchMenus()

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-2">
              Admin Dashboard
            </h1>

            <p className="text-zinc-400">
              Kelola menu cafe
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/admin/add-menu")
            }
            className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-6 py-3 rounded-2xl transition-all duration-300"
          >
            Add Menu
          </button>

        </div>

        <div className="space-y-5">

          {menus.map((menu) => (

            <div
              key={menu.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >

              <div>

                <h2 className="text-2xl font-bold">
                  {menu.name}
                </h2>

                <p className="text-zinc-400">
                  Stock:
                  {" "}
                  {menu.total_stock}
                </p>

              </div>

              <button
                onClick={() =>
                  openDetail(menu)
                }
                className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl"
              >
                Klik Detail
              </button>

            </div>

          ))}

        </div>

        {selectedMenu && (

          <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <h2 className="text-4xl font-bold mb-6">
              Detail Menu
            </h2>

            {selectedMenu.image && (

              <img
                src={`http://127.0.0.1:8000/uploads/${selectedMenu.image}`}
                alt={selectedMenu.name}
                className="w-full max-h-[400px] object-cover rounded-2xl mb-6"
              />

            )}

            <div className="space-y-5">

              <input
                type="text"
                value={editName}
                onChange={(e) =>
                  setEditName(
                    e.target.value
                  )
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white outline-none focus:border-amber-400"
              />

              <textarea
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(
                    e.target.value
                  )
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white h-40 outline-none focus:border-amber-400"
              />

              <input
                type="text"
                value={editAdditionalMenu}
                onChange={(e) =>
                  setEditAdditionalMenu(
                    e.target.value
                  )
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white outline-none focus:border-amber-400"
              />

              <p className="text-amber-400 font-bold text-xl">
                Total Stock:
                {" "}
                {selectedMenu.total_stock}
              </p>

              <input
                type="number"
                placeholder="Tambah Stock"
                value={stockToAdd}
                onChange={(e) =>
                  setStockToAdd(
                    Number(e.target.value)
                  )
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white outline-none focus:border-amber-400"
              />

              <div className="flex flex-col md:flex-row gap-4">

                <button
                  onClick={addStock}
                  className="flex-1 bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl"
                >
                  Tambah Stock
                </button>

                <button
                  onClick={editMenu}
                  className="flex-1 bg-amber-400 hover:bg-amber-300 text-black font-bold py-4 rounded-xl"
                >
                  Save Edit
                </button>

                <button
                  onClick={() =>
                    setSelectedMenu(null)
                  }
                  className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-4 rounded-xl"
                >
                  Tutup
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  )
}

export default AdminDashboard
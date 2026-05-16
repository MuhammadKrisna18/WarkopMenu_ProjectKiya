import { useEffect, useState } from "react"

import axios from "axios"

import Navbar from "../../components/user/Navbar"

import MenuCard from "../../components/user/MenuCard"

type Menu = {
  id: number
  name: string
  image: string | null
  description: string
  total_stock: number
}

function UserMenu() {

  const [menus, setMenus] =
    useState<Menu[]>([])

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

  return (

    <div className="min-h-screen bg-zinc-950">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-white mb-3">
            Daftar Menu
          </h1>

          <p className="text-zinc-400">
            Pilih menu favoritmu di Warkop Kiya
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {menus.map((menu) => (

            <MenuCard
              key={menu.id}
              id={menu.id}
              name={menu.name}
              description={menu.description}
              stock={menu.total_stock}
              image={menu.image}
            />

          ))}

        </div>

      </div>

    </div>
  )
}

export default UserMenu
import Navbar from "../components/Navbar"
import MenuCard from "../components/MenuCard"

function UserMenu() {
  return (
    <div>
      <Navbar />

      <div className="container">
        <h1>Daftar Menu</h1>

        <div className="grid">
          <MenuCard
            name="Kopi Hitam"
            price="Rp 10.000"
          />

          <MenuCard
            name="Es Teh"
            price="Rp 5.000"
          />

          <MenuCard
            name="Indomie"
            price="Rp 12.000"
          />
        </div>
      </div>
    </div>
  )
}

export default UserMenu
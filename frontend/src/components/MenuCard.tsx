type Props = {
  name: string
  price: string
}

function MenuCard({
  name,
  price
}: Props) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{price}</p>
    </div>
  )
}

export default MenuCard
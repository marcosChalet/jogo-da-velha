import './style.css'

import { useState } from 'react'
import { MdClose } from 'react-icons/md';
import { MdOutlineCircle } from 'react-icons/md';

function Item({ id, click }) {

  const [marcador, setMarcador] = useState({
    selecionado: false,
    vezX: false,
  })

  let icon = null

  if ( marcador.selecionado ) {
    icon = marcador.vezX ? "x" : "o"
  }

  return (
    <div
      onClick={() => click && click(setMarcador, marcador.selecionado, id)}
      className="item"
    >
      <div className="mark">
        { icon === "x" && <MdClose color="#3cd25b" size="100%" /> }
        { icon === "o" && <MdOutlineCircle color="#6062f3" size="100%" /> }
      </div>
    </div>
  )
}

export default Item
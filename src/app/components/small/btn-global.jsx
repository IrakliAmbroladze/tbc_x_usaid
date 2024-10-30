import './btn-global.css'

export default function BtnGlobal({children, height, width}) {
  return (
    <button className="btnGlobal" style={{height, width}}> {children} </button>
  )
}

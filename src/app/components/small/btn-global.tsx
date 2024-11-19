import Link from 'next/link'
import './btn-global.css'

export default function BtnGlobal({children, height, width, href}) {
  return (
    <Link href={href}>
    <button className="btnGlobal" style={{height, width}}> {children} </button>
    </Link>
  )
}

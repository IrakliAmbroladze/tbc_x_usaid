import Link from "next/link"

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link> | 
        <Link href="/assignement-3">Assignment 3</Link> | 
        <Link href="/profile">Profile</Link> | 
        <Link href="/products">Products</Link> | 
        <Link href="/blog">BLOG</Link> | 
        <Link href="/contact">Contact</Link> | 
        <Link href="/about">About</Link>
      </nav>

    </header>
  )
}


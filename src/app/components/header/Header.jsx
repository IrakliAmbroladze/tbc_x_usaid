import './header.css'
import Link from "next/link"
import ThemeToggle from '../ThemeToggle'

export default function Header() {
  return (
    <header className="header">
      <nav>
        <Link href="/">Home</Link>
        <Link href="/assignement-3">Assignment 3</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/products">Products</Link>
        <Link href="/blog">BLOG</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/about">About</Link>
        <a href="/api/auth/logout">Logout</a>
      </nav>
      <div>

        <ThemeToggle />
      </div>
    </header>
  )
}


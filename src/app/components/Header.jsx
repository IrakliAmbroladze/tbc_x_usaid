import Link from "next/link"
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="text-center shadow-md h-12 fixed top-0 w-full z-50 flex justify-center items-center dark:text-white bg-white dark:bg-stone-800 bg-opacity-[92%] dark:bg-opacity-[92%]">
      <nav className="flex justify-center flex-wrap gap-3 m-10">
  <Link href="/" className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400">Home</Link>
  <Link href="/assignment-3" className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400">Assignment 3</Link>
  <Link href="/profile" className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400">Profile</Link>
  <Link href="/products" className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400">Products</Link>
  <Link href="/blog" className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400">BLOG</Link>
  <Link href="/contact" className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400">Contact</Link>
  <Link href="/about" className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400">About</Link>
  <a href="/api/auth/logout" className="dark:text-white no-underline transition duration-300 p-2 hover:text-gray-400">Logout</a>
</nav>
      <div >

        <ThemeToggle />
      </div>
    </header>
  )
}


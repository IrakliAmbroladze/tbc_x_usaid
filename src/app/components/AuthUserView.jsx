import Footer from "./footer/Footer";

export default function AuthUserView({children}) {
  return (
    <>
      <main>{children}</main>
      <Footer/>
    </>
  )
}

import Header from "./Header"
import Footer from "./Footer"

const Layout = ({children}) => {
  return (
    <div className="bg-gradient-to-r bg-gray-950 grow min-h-screen text-al-primary">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
import '@styles/globals.css'
import BottomNav from '@components/BottomNav'
import Navbar from '@components/NavBar'

function Application({ Component, pageProps }) {
  return (
    <>
      {/* <NavigationBar/> */}
      <Navbar/>
      {/* <BottomNav /> */}
      <Component {...pageProps} />


    </>
  )
}

export default Application

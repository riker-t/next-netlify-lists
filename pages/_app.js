import '@styles/globals.css'
import BottomNav from '@components/BottomNav'
import NavigationBar from '@components/NavigationBar'

function Application({ Component, pageProps }) {
  return (
    <>
      <NavigationBar/>
      <BottomNav />
      <Component {...pageProps} />


    </>
  )
}

export default Application

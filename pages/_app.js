import '@styles/globals.css'
import BottomNav from '@components/BottomNav'

function Application({ Component, pageProps }) {
  return (
    <>
      <BottomNav />
      <Component {...pageProps} />


    </>
  )
}

export default Application

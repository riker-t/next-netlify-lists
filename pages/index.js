import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <main>
        <Header title="Welcome to Lists!" />
        <p className="description">
          Get started by pressing the <code>+</code> icon in the navigation bar below
        </p>
      </main>
    </div>
  )
}

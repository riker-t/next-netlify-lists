
import styles from './index.module.css'
import Button from '@components/Button'

export default function Home() {
  return (
    <div className = {styles.container}>
        <h1>Welcome to Lists!</h1>
        <div className = {styles.buttonsContainer}>
          <Button link='/example_list_new' cta = 'See an Example'/>
          <Button link='/404' cta = 'Search for Lists or People'/>
          <Button link='/404' cta = 'Create a List'/>
        </div>
        {/* <Header title="Welcome to Lists!" /> */}
        {/* <p className="description">
          Get started by pressing the <code>+</code> icon in the navigation bar below
        </p> */}
    </div>
  )
}

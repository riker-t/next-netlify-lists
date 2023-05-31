
import styles from './index.module.css'
import Button from '@components/Button'
import InfoIcon from '@mui/icons-material/Info'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import MoneyIcon from '@mui/icons-material/Money'
import SearchIcon from '@mui/icons-material/Search'
import TimerIcon from '@mui/icons-material/Timer'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1>Instantly access recommendations from friends and experts you trust.</h1>
        <div className={styles.painPointsContainer}>
          <div className={styles.painPoint}>
            <InfoIcon className={styles.icon} />
            <p className={styles.description}>Save time and avoid the confusion of sifting through countless search results and reviews.</p>
          </div>
          {/* <div className={styles.painPoint}>
            <VerifiedUserIcon className={styles.icon} />
            <p className={styles.description}>Lack of Trust: Trust recommendations from friends and experts you know, instead of anonymous sources.</p>
          </div> */}
          <div className={styles.painPoint}>
            <VerifiedUserIcon className={styles.icon} />
            <p className={styles.description}>Make decisions based on genuine recommendations, not biased information driven by paid advertisements.</p>
          </div>
          <div className={styles.painPoint}>
            <SearchIcon className={styles.icon} />
            <p className={styles.description}>Get personalized recommendations tailored to your tastes and preferences.</p>
          </div>
          {/* <div className={styles.painPoint}>
            <TimerIcon className={styles.icon} />
            <p className={styles.description}>Inefficient Decision-Making: Streamline your decision-making process and overcome decision fatigue.</p>
          </div> */}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Button link="/example_list_new" cta="See an Example" />
        <Button link="/404" cta="Search for Lists or People" />
        <Button link="/404" cta="Create a List" />
      </div>
    </div>
  )
}
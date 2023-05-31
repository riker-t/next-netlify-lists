
import styles from './index.module.css'
import Button from '@components/Button'
import InfoIcon from '@mui/icons-material/Info'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import MoneyIcon from '@mui/icons-material/Money'
import SearchIcon from '@mui/icons-material/Search'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1>The way we create and discover content is changing.</h1>
        <div className={styles.painPointsContainer}>
          <div className={styles.painPoint}>
            <AutoFixHighIcon className={styles.icon} fontSize='large' />
            <p className={styles.description}>Use AI to transform notes, messages, docs, and social media into shareable content within minutes.</p>
            <Button link="/404" cta="Try It" />
          </div>
          <div className={styles.painPoint}>
            <SearchIcon className={styles.icon} fontSize='large'/>
            <p className={styles.description}>Discover recommendations from friends and experts you actually trust.</p>
            <Button link="/404" cta="Search" />
          </div>
          {/* <div className={styles.painPoint}>
            <RocketLaunchIcon className={styles.icon} fontSize='large'/>
            <p className={styles.description}>Build and optimize your brand with high quality content, optimized with Understand and capitalize on trends and user behaviors.</p>
            <Button link="/404" cta="Learn More" />
          </div> */}
        </div>
      </div>
      {/* <div className={styles.buttonsContainer}>
        <Button link="/example_list_new" cta="See an Example" />
      </div> */}
    </div>
  )
}
import styles from './ProfileList.module.css'
import Link from 'next/link';
import Button from '@components/Button'


function ProfileList({ refId, data }) {

    const { title } = data

    return (
        <Link href={`/lists/${refId}`}>

            <div className={styles.container}>

                <div>{title}</div>
                <Button link={`/lists/${refId}`} cta='View'/>
            </div>
        </Link>


    )
}

export default ProfileList;

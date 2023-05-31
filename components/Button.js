import Link from "next/link"
import styles from './Button.module.css'

export default function Button({ link, cta }) {
    return (
        <>
            <Link href={link}>
                <div className={styles.container}>
                    <a className={styles.text}>{cta}</a>
                </div >
            </Link>

        </>
    )
}
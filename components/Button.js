import Link from "next/link"
import styles from './Button.module.css'

export default function Button({ link, cta }) {
    return (
        <>
            <div className={styles.container}>
                <Link href={link}>
                    <a className={styles.text}>{cta}</a>
                </Link>
            </div >
        </>
    )
}
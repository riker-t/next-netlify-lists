import styles from './index.module.css'
import Button from '@components/Button'
import Profile from '@components/Profile'

export default function ExampleProfile() {

    const example_profile = {
        image: 'https://media.licdn.com/dms/image/C4E03AQH8BQHbbYxnGw/profile-displayphoto-shrink_800_800/0/1563299356210?e=2147483647&v=beta&t=bwzNGxtWDYFGKx2sBPu7DUIht2ww5ZGwbLcJE30XBIk',
        name: 'Teddy Riker',
        lists: 6,
        likes: '1.3k',
        saves: 899,
    }
    return (
        <>
            <Profile user={example_profile} />
        </>
    )
}
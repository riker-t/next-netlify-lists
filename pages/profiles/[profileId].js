// pages/profiles/[profileId].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import HeroNumber from './HeroNumber';
import ProfileInfo from './ProfileInfo';
import ProfileListOverview from './ProfileListOverview';
import ProfileListGroup from './ProfileListGroup';

function ProfilePage() {
    const router = useRouter();
    const { profileId } = router.query;

    const [profile, setProfile] = useState(null);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        if (!profileId) {
            return;
        }
        if (profileId) {
            fetch('/.netlify/functions/get-profile?profileId=' + profileId)
                .then(response => response.json())
                .then(data => setProfile(data))
                .catch(error => console.log('error', error));

            fetch('/.netlify/functions/get-profile-lists?profileId=' + profileId)
                .then(response => response.json())
                .then(data => setLists(data))
                .catch(error => console.log('error', error));
        }
    }, [profileId]);

    if (!profile || lists.length === 0) {
        return <div>Loading...</div>;
    }



    return (
        <div className={styles.profile}>
            <ProfileInfo image={profile.data.photoUrl} name={profile.data.name} />
            <div className={styles.heroNumbers}>
                <HeroNumber number={lists.length} label="Lists" />
                {/*You will need to modify these HeroNumber components to fit with your actual data structure*/}
                <HeroNumber number={0} label="Likes" />
                <HeroNumber number={0} label="Saves" />
            </div>
            <ProfileListGroup lists={lists} />
        </div>
    );
}

export default ProfilePage;

// Profile.js
import styles from './Profile.module.css';
import HeroNumber from './HeroNumber';
import ProfileInfo from './ProfileInfo';
import ProfileListOverview from './ProfileListOverview';

function Profile({ user }) {
    const { image, name, lists, likes, saves } = user;
    const sampleData = [
        {
            title: 'Most popular',
            lists: [
                {
                    id: 1,
                    name: 'Best movies 2010-2020',
                    image: 'https://m.media-amazon.com/images/M/MV5BMTYxNzI0MDc5N15BMl5BanBnXkFtZTcwODQ0MjUxNw@@._V1_.jpg',
                    likes: 125,
                    saves: 78
                },
                {
                    id: 2,
                    name: 'Ranking the best slice in Williamsburg',
                    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60',
                    likes: 120,
                    saves: 110
                },
                {
                    id: 3,
                    name: 'Williamsburg Activities',
                    image: 'https://images.unsplash.com/photo-1626447833939-edc3ae5802c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
                    likes: 220,
                    saves: 198
                }
            ]
        },
        {
            title: 'New',
            lists: [
                {
                    id: 4,
                    name: 'Chinatown Dumpling Tour',
                    image: 'https://images.unsplash.com/photo-1617183545317-9b62b9b24812?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGR1bXBsaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60',
                    likes: 80,
                    saves: 45
                },
                {
                    id: 5,
                    name: 'Ranking the best slice in Williamsburg',
                    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60',
                    likes: 120,
                    saves: 110
                },
                {
                    id: 6,
                    name: 'Great short story books for a beach day',
                    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60',
                    likes: 145,
                    saves: 90
                },
            ]
        }
    ];

    return (
        <div className={styles.profile}>
            <ProfileInfo image={image} name={name} />
            <div className={styles.heroNumbers}>
                <HeroNumber number={lists} label="Lists" />
                <HeroNumber number={likes} label="Likes" />
                <HeroNumber number={saves} label="Saves" />
            </div>
            <ProfileListOverview groups = {sampleData}/>
        </div>
    )
}

export default Profile;

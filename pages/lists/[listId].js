// pages/lists/[listId].js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Item from './Item';
import ListHeader from './ListHeader';
import GalleryView from './GalleryView';
import styles from './List.module.css';

const ListPage = () => {
    const router = useRouter();
    const { listId } = router.query;

    const [galleryView, setGalleryView] = useState({ isOpen: false, index: null });
    const [items, setItems] = useState([]);
    const [listData, setListData] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!listId) {
            return;
        }
    
        setIsLoading(true);
    
        Promise.all([
            fetch('/.netlify/functions/get-list-data', {
                method: 'POST',
                body: JSON.stringify({ listId: listId }),
            }),
            fetch('/.netlify/functions/get-items', {
                method: 'POST',
                body: JSON.stringify({ listId: listId }),
            }),
        ])
            .then(async ([listDataRes, itemsRes]) => {
                if (!listDataRes.ok || !itemsRes.ok) {
                    const listDataError = listDataRes.ok ? null : await listDataRes.json();
                    const itemsError = itemsRes.ok ? null : await itemsRes.json();
                    throw new Error(`List Data Error: ${JSON.stringify(listDataError)}, Items Error: ${JSON.stringify(itemsError)}`);
                }
    
                const listData = await listDataRes.json();
                console.log(listData)
                const itemsData = await itemsRes.json();
    
                setListData(listData);
                setItems(itemsData.data);
            })
            .catch(setError)
            .finally(() => {
                setIsLoading(false);
            });
    }, [listId]);
    




    const handleImageClick = index => {
        setGalleryView({ isOpen: true, index });
    };

    const handleCloseGallery = () => {
        setGalleryView({ isOpen: false, index: null });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <ListHeader
                profileIcon={listData.profile?.photoUrl}
                profileId={listData.profile?.id}
                profileName={listData.profile?.name}
                listName={listData.list?.title}
            />
            <div className={styles.listContentContainer}>
                {galleryView.isOpen ? (
                    <GalleryView
                        images={items.map(item => item.data)}
                        index={galleryView.index}
                        onClose={handleCloseGallery}
                    />

                ) : (
                    <div>
                        {items.map((item, index) => (
                            <Item key={item.ref['@ref'].id} item={item.data} index={index} onImageClick={handleImageClick} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListPage;

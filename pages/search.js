import { useState, useEffect } from 'react';
import SearchResultList from '@components/SearchResultList';
import SearchResultProfile from '@components/SearchResultProfile';
import styles from './Search.module.css';
import ProfileList from './profiles/ProfileList';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [results, setResults] = useState([]);
    const [initialLists, setInitialLists] = useState([]);
    const [initialProfiles, setInitialProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);




    const fetchLists = async (searchValue) => {
        const response = await fetch(`/.netlify/functions/search-lists?q=${searchValue}`);
        const data = await response.json();
        return data;
    };

    const fetchProfiles = async (searchValue) => {
        const response = await fetch(`/.netlify/functions/search-profiles?q=${searchValue}`);
        const data = await response.json();
        return data;
    };

    const fetchInitialLists = async (searchValue) => {
        const response = await fetch(`/.netlify/functions/search-initial-lists?q=${searchValue}`);
        const data = await response.json();
        return data;
    };

    const fetchInitialProfiles = async (searchValue) => {
        const response = await fetch(`/.netlify/functions/search-initial-profiles?q=${searchValue}`);
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [initialListsData, initialProfilesData] = await Promise.all([
                    fetchInitialLists(''),
                    fetchInitialProfiles('')
                ]);

                setInitialLists(initialListsData);
                setInitialProfiles(initialProfilesData);
            } catch (error) {
                console.error(error);  // handle error as needed
            } finally {
                setIsLoading(false);  // ensure this runs after both fetches have either resolved or rejected
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const handleSearch = async () => {
            if (searchValue === '') {
                setResults(activeTab === 0 ? initialLists : initialProfiles);
                return;
              }

            let newResults = [];
            if (activeTab === 0) { // Lists tab is active
                newResults = await fetchLists(searchValue);
            } else { // Profiles tab is active
                newResults = await fetchProfiles(searchValue);
            }

            setResults(newResults);
        };
        handleSearch();
    }, [searchValue, activeTab]);

    const handleFocus = () => {
        setSearchValue('');
    };

    const handleBlur = () => {
        if (searchValue === '') {
            setSearchValue('');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.searchBar}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Search (It doesn't work yet)"
            />
            <div className={styles.tabs}>
                <div className={`${styles.tab} ${activeTab === 0 ? styles.activeTab : ''}`} onClick={() => setActiveTab(0)}>Lists</div>
                <div className={`${styles.tab} ${activeTab === 1 ? styles.activeTab : ''}`} onClick={() => setActiveTab(1)}>Profiles</div>
                <div className={`${styles.underline} ${activeTab === 0 ? styles.list : styles.profile}`}></div>
            </div>
            {results.map((result) => activeTab === 0
                ? <ProfileList key={result.ref['@ref'].id} data={result.data} refId={result.ref['@ref'].id} />
                : <SearchResultProfile key={result.ref['@ref'].id} profile={result.data} refId={result.ref['@ref'].id}/>
            )}
        </div>
    );
};

export default Search;

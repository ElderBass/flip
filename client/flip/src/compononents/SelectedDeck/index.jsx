import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import store from '../../store';
import * as UserActions from '../../store/actions/user';
import styles from './SelectedDeck.module.css';
import { useEffect } from 'react';
import { editDeckFavorites, editUserFavorites } from '../../api';

const FAVORITE_CLASS = 'fas fa-heart fa-2x';
const REGULAR_CLASS = 'far fa-heart fa-2x';

const SelectedDeck = () => {
    const {
        decks: { selectedDeck },
        user: { favorites, email }
    } = store.getState();
    const { deckName, cards, timestamp, _id, favorites: timesFavorited } = selectedDeck;

    const [iconClass, setIconClass] = useState(REGULAR_CLASS);
    const [deckFavorites, setDeckFavorites] = useState(timesFavorited);

    useEffect(() => {
        if (favorites.length) {
            const isFavorited = favorites.filter((deck) => deck._id === _id).length > 0;
            if (isFavorited) {
                setIconClass(FAVORITE_CLASS);
            }
        }
    }, [favorites, _id]);

    const onFavoriteClick = async () => {
        let updatedFavorites = [];
        if (iconClass === FAVORITE_CLASS) {
            store.dispatch(UserActions.removeFavoriteDeck(_id));
            updatedFavorites = favorites.filter((favs) => !favs._id === _id);
            setDeckFavorites(deckFavorites - 1);
            setIconClass(REGULAR_CLASS);
        } else {
            console.log('\n when are we inside ELSE BLOCK on fav click? \n\n')
            console.log('\n\n deck favs before alteration ', deckFavorites, '\n\n');
            store.dispatch(UserActions.addFavoriteDeck(selectedDeck));
            updatedFavorites = [...favorites, selectedDeck];
            setDeckFavorites(deckFavorites + 1);
            setIconClass(FAVORITE_CLASS);
        }

        await editUserFavorites({ favorites: updatedFavorites, email });
        await editDeckFavorites({ favorites: deckFavorites, deckId: _id });
    };

    const dateCreated = new Date(timestamp).toLocaleDateString();

    return (
        <div className={styles.selectedDeckContainer}>
            <div className={styles.selectedDeck}>
                <div className={styles.greyLines}>
                    <hr className={styles.greyLine} />
                    <hr className={styles.greyLine} />
                    <hr className={styles.greyLine} />
                    <hr className={styles.greyLine} />
                    <hr className={styles.greyLine} />
                </div>
                <div className={styles.selectedDeckHeader}>
                    <div className={styles.spacer} />
                    <p className={styles.header}>{deckName}</p>
                    <i onClick={onFavoriteClick} className={`${iconClass} ${styles.icon}`}></i>
                </div>
                <div className={styles.deckStats}>
                    <div className={styles.statWrap}>
                        <p className={styles.statLabel}>Number of Cards:</p>
                        <p className={styles.stat}>{cards.length}</p>
                    </div>
                    <div className={styles.statWrap}>
                        <p className={styles.statLabel}>Date Created:</p>
                        <p className={styles.stat}>{dateCreated}</p>
                    </div>
                    <div className={styles.statWrap}>
                        <p className={styles.statLabel}>Times Favorited:</p>
                        <p className={styles.stat}>{deckFavorites}</p>
                    </div>
                </div>
                <div className={styles.actions}>
                    <Link
                        to={{ pathname: '/edit-deck', state: { isEdit: true } }}
                        className={`${styles.button} ${styles.editBtn}`}
                    >
                        Edit
                    </Link>
                    <button className={`${styles.button} ${styles.studyBtn}`}>Study</button>
                </div>
            </div>
        </div>
    );
};

export default SelectedDeck;

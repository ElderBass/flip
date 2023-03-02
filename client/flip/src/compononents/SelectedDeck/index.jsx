import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import store from '../../store';
import * as UserActions from '../../store/actions/user';
import * as DeckActions from '../../store/actions/decks';
import { useEffect } from 'react';
import { deleteDeck, editDeckFavorites, editUserFavorites, updateUser } from '../../api';
import { trimEmail } from '../../utils/helpers/emailHelpers';
import DeleteDeckModal from '../DeleteDeckModal';
import styles from './SelectedDeck.module.css';

const FAVORITE_CLASS = 'fas fa-heart fa-2x';
const REGULAR_CLASS = 'far fa-heart fa-2x';
const DELETE_CLASS = 'fas fa-trash fa-2x';

const SelectedDeck = () => {
    const history = useHistory();

    const {
        decks: { selectedDeck },
        user,
    } = store.getState();

    const { deckName, cards, timestamp, _id, favorites: timesFavorited, author } = selectedDeck;
    const { favorites, email } = user;

    const [iconClass, setIconClass] = useState(REGULAR_CLASS);
    const [deckFavorites, setDeckFavorites] = useState(timesFavorited);
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (favorites.length) {
            const isFavorited = favorites.filter((deck) => deck._id === _id).length > 0;
            if (isFavorited) {
                setIconClass(FAVORITE_CLASS);
            }
        }
    }, [favorites, _id]);

    useEffect(() => {
        if (author === trimEmail(email)) {
            setShowDeleteIcon(true);
        }
    }, [author, email]);

    const onFavoriteClick = async () => {
        let updatedFavorites = [];
        if (iconClass === FAVORITE_CLASS) {
            updatedFavorites = favorites.filter((favs) => !favs._id === _id);
            store.dispatch(UserActions.removeFavorite(selectedDeck));
            setDeckFavorites(deckFavorites - 1);
            setIconClass(REGULAR_CLASS);
        } else {
            updatedFavorites = [...favorites, selectedDeck];
            store.dispatch(UserActions.addFavorite(selectedDeck));
            setDeckFavorites(deckFavorites + 1);
            setIconClass(FAVORITE_CLASS);
        }
        // TODO: Refactor this to just use updateUser
        await editUserFavorites({ favorites: updatedFavorites, email });
        await editDeckFavorites({ favorites: timesFavorited + 1, deckId: _id });
        store.dispatch(
            DeckActions.setSelectedDeck({ ...selectedDeck, favorites: timesFavorited + 1 })
        );
    };

    const onDeleteClick = async () => {
        setShowDeleteModal(true);
    };

    const onDeleteDeck = async () => {
        try {
            const updatedFavorites = favorites.filter((fav) => fav._id !== _id);
            const newUser = {
                ...user,
                favorites: updatedFavorites,
            };

            const response = await updateUser(newUser);
            await store.dispatch(UserActions.updateUser(response.data.user));

            await deleteDeck(_id);
            await store.dispatch(DeckActions.setSelectedDeck(null));
            history.push('/home');
        } catch (e) {
            console.log('\n error in deleting deck = ', e, '\n\n');
        }
    };

    const dateCreated = new Date(timestamp).toLocaleDateString();

    return (
        <div className={styles.selectedDeckContainer}>
            {showDeleteModal ? (
                <DeleteDeckModal
                    confirmDelete={onDeleteDeck}
                    cancel={() => setShowDeleteModal(false)}
                />
            ) : (
                <div className={styles.selectedDeck}>
                    <div className={styles.greyLines}>
                        <hr className={styles.greyLine} />
                        <hr className={styles.greyLine} />
                        <hr className={styles.greyLine} />
                        <hr className={styles.greyLine} />
                        <hr className={styles.greyLine} />
                    </div>
                    <div className={styles.selectedDeckHeader}>
                        {showDeleteIcon ? (
                            <i
                                onClick={onDeleteClick}
                                className={`${DELETE_CLASS} ${styles.icon}`}
                            />
                        ) : (
                            <div className={styles.spacer} />
                        )}
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
                        <Link to="/study" className={`${styles.button} ${styles.studyBtn}`}>
                            Study
                        </Link>
                    </div>
                    <div className={`${styles.returnHome} ${styles.button}`}>
                        <Link className={`${styles.returnHomeLink} ${styles.button}`} to="/home">
                            Back to Home
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedDeck;

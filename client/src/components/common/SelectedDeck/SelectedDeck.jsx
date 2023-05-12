import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import store from '../../../store';
import * as UserActions from '../../../store/actions/user';
import * as DeckActions from '../../../store/actions/decks';
import {useEffect} from 'react';
import {deleteDeck, editDeckFavorites, updateUser} from '../../../api';
import {trimEmail} from '../../../utils/helpers/emailHelpers';
import styles from './SelectedDeck.module.css';
import AbortActionConfirmationModal from "../AbortActionConfirmationModal";

const FAVORITE_CLASS = 'fas fa-heart fa-2x';
const REGULAR_CLASS = 'far fa-heart fa-2x';
const DELETE_CLASS = 'fas fa-trash fa-2x';

const SelectedDeck = () => {
    const history = useHistory();

    const {
        decks: {selectedDeck},
        user,
    } = store.getState();

    const {
        deckName,
        cards,
        timestamp,
        _id: deckId,
        userId,
        favorites: timesFavorited,
        author,
    } = selectedDeck;
    const {favorites, email} = user;

    const [iconClass, setIconClass] = useState(REGULAR_CLASS);
    const [deckFavorites, setDeckFavorites] = useState(timesFavorited);
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // const [nameFontSize, setNameFontSize] = useState('10px');

    useEffect(() => {
        if (favorites.length) {
            const isFavorited = favorites.filter((deck) => deck._id === deckId).length > 0;
            if (isFavorited) {
                setIconClass(FAVORITE_CLASS);
            }
        }
    }, [favorites, deckId]);

    useEffect(() => {
        if (author === trimEmail(email)) {
            setShowDeleteIcon(true);
        }
    }, [author, email]);

    // useEffect(() => {
    //       if (deckNameRef && deckNameRef.current) {
    //         const isOverflown = () => deckNameRef.current.scrollHeight > 91;

    //         let size = 10;
    //         let overflow = false;
    //         const maxSize = 41;

    //         while (!overflow && size < maxSize) {
    //             console.log('\n ayyyy ', deckNameRef.current.scrollHeight, '\n\n');
    //             setNameFontSize(`${size}px`);
    //             overflow = isOverflown();
    //             if (!overflow) size++;
    //         }

    //         setNameFontSize(`${size - 1}px`);
    //       }
    // }, []);

    const onFavoriteClick = async () => {
        let updatedFavorites = [];

        if (iconClass === FAVORITE_CLASS) {
            updatedFavorites = favorites.filter((favs) => !favs._id === deckId);
            setDeckFavorites(deckFavorites - 1);
            setIconClass(REGULAR_CLASS);
        } else {
            updatedFavorites = [...favorites, selectedDeck];
            setDeckFavorites(deckFavorites + 1);
            setIconClass(FAVORITE_CLASS);
        }
        const newUser = {
            ...user,
            favorites: updatedFavorites,
        };

        await updateUser(newUser);
        await editDeckFavorites({favorites: timesFavorited + 1, deckId});

        store.dispatch(UserActions.updateUser(newUser));
        store.dispatch(
            DeckActions.setSelectedDeck({...selectedDeck, favorites: timesFavorited + 1})
        );
    };

    const onDeleteClick = async () => {
        setShowDeleteModal(true);
    };

    const onDeleteDeck = async () => {
        try {
            const updatedFavorites = favorites.filter((fav) => fav._id !== deckId);
            const newUser = {
                ...user,
                favorites: updatedFavorites,
            };

            await updateUser(newUser);
            await store.dispatch(UserActions.updateUser(newUser));

            await deleteDeck(deckId);
            await store.dispatch(DeckActions.setSelectedDeck(null));
            history.push('/home');
        } catch (e) {
            console.log('\n error in deleting deck = ', e, '\n\n');
        }
    };

    const goBack = () => {
        history.goBack();
    };

    const dateCreated = new Date(timestamp).toLocaleDateString();

    return (
        <div className={styles.selectedDeckContainer}>
            {showDeleteModal ? (
                <AbortActionConfirmationModal
                    message="You really wanna delete this deck?"
                    deleteFunc={onDeleteDeck}
                    cancelFunc={() => setShowDeleteModal(false)}
                />
            ) : (
                <>
                    <div title={deckName} className={styles.selectedDeck}>
                        <div className={styles.greyLines}>
                            <hr className={styles.greyLine}/>
                            <hr className={styles.greyLine}/>
                            <hr className={styles.greyLine}/>
                            <hr className={styles.greyLine}/>
                            <hr className={styles.greyLine}/>
                        </div>
                        <div className={styles.selectedDeckHeader}>
                            {showDeleteIcon ? (
                                <i
                                    onClick={onDeleteClick}
                                    className={`${DELETE_CLASS} ${styles.icon}`}
                                />
                            ) : (
                                <div className={styles.spacer}/>
                            )}
                            <p className={styles.header}>{deckName}</p>
                            <i
                                onClick={onFavoriteClick}
                                className={`${iconClass} ${styles.icon}`}
                            ></i>
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
                            {user._id === userId && (
                                <Link
                                    to={{pathname: '/edit-deck', state: {isEdit: true}}}
                                    className={`${styles.button} ${styles.editBtn}`}
                                >
                                    Edit
                                </Link>
                            )}
                            {cards.length > 0 &&
                                <Link to="/study" className={`${styles.button} ${styles.studyBtn}`}>
                                    Study
                                </Link>
                            }
                        </div>
                    </div>
                    <div className={`${styles.returnHome} ${styles.button}`}>
                        <button className={`${styles.backBtn} ${styles.button}`} onClick={goBack}>
                            Back
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SelectedDeck;

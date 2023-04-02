import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import store from '../../../store';
import { getAllUserDecks } from '../../../api';
import { trimEmail } from '../../../utils/helpers/emailHelpers';
import Deck from '../CarouselItems/Deck';
import styles from './UserResult.module.css';
import ScrollCaret from '../ScrollCaret';
import { setSelectedDeck } from '../../../store/actions/decks';

const UserResult = ({ user }) => {
    const { email, _id } = user;
    const [username, setUsername] = useState('');
    const [decks, setDecks] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const getUserDecks = async () => {
            try {
                const response = await getAllUserDecks(_id);
                setDecks(response.data.decks);
                setUsername(trimEmail(email));
            } catch (e) {
                console.log('\n error in getting user decks = ', e, '\n\n');
            }
        };
        getUserDecks();
    }, [email, _id]);

    const RightArrow = <ScrollCaret direction="Right" />;
    const LeftArrow = <ScrollCaret direction="Left" />;

    const deckClasses = {
        container: styles.deckCarouselItem,
        line: styles.line,
        name: styles.name,
    };

    const onSelectDeck = async (deck) => {
        await store.dispatch(setSelectedDeck(deck));
        history.push('/deck');
    };

    return (
        <div to={`/user/${_id}`} className={styles.userResultContainer}>
            <h4 onClick={() => history.push(`/user/${_id}`)} className={styles.username}>{username}</h4>
            {decks.length > 0 ? (
                <ScrollMenu
                    RightArrow={RightArrow}
                    LeftArrow={LeftArrow}
                    scrollContainerClassName={styles.contentContainer}
                >
                    {decks.map((item, i) => (
                        <Deck
                            key={i}
                            onClick={() => onSelectDeck(item)}
                            item={item}
                            itemId={item._id}
                            classes={deckClasses}
                        />
                    ))}
                </ScrollMenu>
            ) : (
                'This user has no decks'
            )}
        </div>
    );
};

export default UserResult;

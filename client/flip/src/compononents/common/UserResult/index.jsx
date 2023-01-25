import React, { useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { getAllUserDecks } from '../../../api';
import { trimEmail } from '../../../utils/helpers/emailHelpers';
import Deck from '../CarouselItems/Deck';
import styles from './UserResult.module.css';
import ScrollCaret from '../ScrollCaret';

const UserResult = ({ user }) => {
    const { email, _id } = user;
    const [username, setUsername] = useState('');
    const [decks, setDecks] = useState([]);

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

    return (
        <div className={styles.userResultContainer}>
            <h4 className={styles.username}>{username}</h4>
            {decks.length > 0 ? (
                <ScrollMenu
                    RightArrow={RightArrow}
                    LeftArrow={LeftArrow}
                    scrollContainerClassName={styles.contentContainer}
                >
                    {decks.map((item, i) => (
                        <Deck key={i} item={item} itemId={item._id} classes={deckClasses} />
                    ))}
                </ScrollMenu>
            ) : (
                'This user has no decks'
            )}
        </div>
    );
};

export default UserResult;

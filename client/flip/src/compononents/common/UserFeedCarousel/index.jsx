import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import ScrollArrow from '../ScrollArrow';
import Deck from '../CarouselItems/Deck';
import Following from '../CarouselItems/Following';
import styles from './UserFeedCarousel.module.css';

const UserFeedCarousel = ({ type, content }) => {
    const CarouselItemMap = {
        Decks: Deck,
        Favorites: Deck,
        Following: Following,
    };

    const CarouselItem = CarouselItemMap[type];

    const RightArrow = <ScrollArrow direction="Right" />;
    const LeftArrow = <ScrollArrow direction="Left" />;

    const classes = {
        container: styles.deckCarouselItem,
        line: styles.line,
        name: styles.name
    };

    return (
        <div className={styles.userFeedCarousel}>
            <h2 className={styles.contentHeader}>{type}</h2>
            {content.length > 0 ? (
                <ScrollMenu
                    RightArrow={RightArrow}
                    LeftArrow={LeftArrow}
                    scrollContainerClassName={styles.contentContainer}
                >
                    {content.map((item, i) => (
                        <CarouselItem key={i} item={item} itemId={item._id} classes={classes} />
                    ))}
                </ScrollMenu>
            ) : (
                'There is no content here'
            )}
        </div>
    );
};

export default UserFeedCarousel;

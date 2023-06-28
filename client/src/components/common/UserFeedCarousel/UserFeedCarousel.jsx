import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import ScrollArrow from '../ScrollArrow';
import Deck from '../CarouselItems/Deck';
import Following from '../CarouselItems/Following';
import styles from './UserFeedCarousel.module.css';
import carouselItemStyles from '../CarouselItems/CarouselItem/CarouselItem.module.css';

// TODO: refactor to have all fetching occur here, with 'loading' prop passed in
const UserFeedCarousel = ({ type, content }) => {
    const RightArrow = <ScrollArrow direction="Right" />;
    const LeftArrow = <ScrollArrow direction="Left" />;

    return (
        <div className={styles.userFeedCarousel}>
            <h2 className={styles.contentHeader}>{type}</h2>
            {content.length > 0 ? (
                <ScrollMenu
                    RightArrow={RightArrow}
                    LeftArrow={LeftArrow}
                    scrollContainerClassName={styles.contentContainer}
                >
                    {content.map((item, i) => {
                        const baseClasses = {
                            container: carouselItemStyles.container,
                            line: carouselItemStyles.line,
                            label: carouselItemStyles.label,
                        };

                        const followingClasses = {
                            ...baseClasses,
                            container: `${carouselItemStyles.container} ${carouselItemStyles.following}`,
                        };

                        const CarouselItemMap = {
                            Decks: { Comp: Deck, classes: baseClasses },
                            Favorites: { Comp: Deck, classes: baseClasses },
                            Following: { Comp: Following, classes: followingClasses },
                        };
                        const CarouselItem = CarouselItemMap[type];
                        const { Comp, classes } = CarouselItem;

                        return <Comp key={i} item={item} itemId={item._id} classes={classes} />;
                    })}
                </ScrollMenu>
            ) : (
                <div className={styles.noContent}>There is no content here</div>
            )}
        </div>
    );
};

export default UserFeedCarousel;

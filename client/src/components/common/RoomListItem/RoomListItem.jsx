import React, { useState } from 'react';
import styles from './RoomListItem.module.css';

const RoomListItem = ({ room, onClick }) => {
    const defaultText = `Host: ${room.host}`;
    const [displayText, setDisplayText] = useState(defaultText);

    return (
        <li
            onMouseEnter={() => setDisplayText('Click to Join')}
            onMouseLeave={() => setDisplayText(defaultText)}
            onClick={() => onClick(room)}
            className={styles.roomListItem}
        >
            {displayText}
        </li>
    );
};

export default RoomListItem;

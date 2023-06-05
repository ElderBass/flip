import React, { useState } from 'react';
import styles from './RoomListItem.module.css';

const RoomListItem = ({ room, onClick, disabled }) => {
    const defaultText = `Host: ${room.host}`;
    const [displayText, setDisplayText] = useState(defaultText);

    return (
        <li>
            <button
                onMouseEnter={() => setDisplayText('Click to Join')}
                onMouseLeave={() => setDisplayText(defaultText)}
                onClick={() => onClick(room)}
                className={styles.roomListItem}
                type="button"
                disabled={disabled}
            >
                {disabled ? defaultText : displayText}
            </button>
        </li>
    );
};

export default RoomListItem;

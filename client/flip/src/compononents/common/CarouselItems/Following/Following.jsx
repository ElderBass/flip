import React from 'react';
import { Link } from 'react-router-dom';
import { trimEmail } from '../../../../utils/helpers/emailHelpers';
import CarouselItem from '../CarouselItem';

const Following = ({ item }) => {
    return (
        <Link className='link' to={`/user/${item._id}`}>
            <CarouselItem onClick={() => {}} label={trimEmail(item.email)} />
        </Link>
    );
};

export default Following;

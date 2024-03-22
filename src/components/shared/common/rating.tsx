import { StarIcon } from '@heroicons/react/20/solid';
import { ItemStyles, Rating, RatingProps } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const customStyles: ItemStyles = {
    itemShapes: <StarIcon className='fill-inherit' />,
    activeFillColor: 'rgb(234 179 8 / 1)',
    inactiveFillColor: 'hsl(var(--muted))',
};

export default function RatingStars({ ...props }: RatingProps) {
    return <Rating
        className='gap-0'
        {...props}
        style={{ maxWidth: 130 }}
        itemStyles={customStyles}
    />
}
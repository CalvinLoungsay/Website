import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

export function RenderStars(rating: number, size:number, maxStars: number = 5): React.ReactNode {
    const stars = [];

    for (let i = 0; i < maxStars; i++) {
        if (rating >= i + 1) {
            stars.push(<FaStar size = {size} key={i} color="#ffc107" />);
        } else if (rating > i && rating < i + 1) {
            stars.push(<FaStarHalfAlt size = {size} key={i} color="#ffc107" />);
        } else {
            stars.push(<FaRegStar size = {size} key={i} color="#ccc" />);
        }
    }

    return stars;
}

export function FormatTimeAgo(updatedDate: Date): string {
    const seconds = Math.floor((Date.now() - updatedDate.getTime()) / 1000);

    const intervals: [number, string][] = [
        [60, 'second'],
        [60, 'minute'],
        [24, 'hour'],
        [30, 'day'],
        [12, 'month'],
        [Number.POSITIVE_INFINITY, 'year']
    ];

    let i = 0;
    let count = seconds;

    while (i < intervals.length - 1 && count >= intervals[i][0]) {
        count = Math.floor(count / intervals[i][0]);
        i++;
    }

    const unit = intervals[i][1];
    const plural = count !== 1 ? 's' : '';
    return `Updated ${count} ${unit}${plural} ago`;
}

export default class RatingEntity {
    rating: number;
    static ratingRange = 2;

    setRating(rating: number): boolean {
        if (Math.abs(rating) > RatingEntity.ratingRange) return false;
        this.rating = rating;
        return true;
    }
}
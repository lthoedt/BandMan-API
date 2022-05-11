class Rating {
    rating: number;
    static ratingRange = 2;

    setRating(rating: number): boolean {
        if (Math.abs(rating) > Rating.ratingRange) return false;
        this.rating = rating;
        return true;
    }
}

export default Rating;
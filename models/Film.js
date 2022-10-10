export default class Film {
    constructor(title, id) {
        this.title = title;
        this.id = id;
    }
    setTitle(title) {
        this.title = title;
    }
    setDescription(description) {
        this.description = description;
    }
    setReleaseYear(releaseYear) {
        this.releaseYear = releaseYear;
    }
    setLanguage(language) {
        this.language = language;
    }
    setOriginalLanguage(originalLanguage) {
        this.originalLanguage = originalLanguage;
    }
    setRentalDuration(rentalDuration) {
        this.rentalDuration = rentalDuration;
    }
    setRentalRate(rentalRate) {
        this.rentalRate = rentalRate;
    }
    setLength(length) {
        this.length = length;
    }
    setReplacementCost(replacementCost) {
        this.replacementCost = replacementCost;
    }
    setRating(rating) {
        this.rating = rating;
    }
    setSpecialFeatures(specialFeatures) {
        this.specialFeatures = specialFeatures;
    }
    update() {

    }
}
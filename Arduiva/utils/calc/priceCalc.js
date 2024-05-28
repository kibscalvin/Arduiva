export const calculatePrice = (distance) => {
    const distanceInKm = parseFloat(distance.split(' ')[0]);
    const basePrice = 5000;
    const pricePerKm = 1000;
    return basePrice + distanceInKm * pricePerKm;
};
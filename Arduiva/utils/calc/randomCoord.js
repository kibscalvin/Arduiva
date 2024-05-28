

// Function to generate random coordinates based on a given latitude, longitude, and radius
export const generateRandomCoordinates = (lat, lng, radius = 500) => {
    const getRandomOffset = () => (Math.random() - 0.5) * 2 * radius;
    const earthRadius = 6371;
    const getRandomDistance = () => Math.sqrt(Math.random()) * radius;
    const getRandomAngle = () => Math.random() * 2 * Math.PI;
    const dx = getRandomDistance() / earthRadius;
    const angle = getRandomAngle();
    const deltaLat = dx * Math.cos(angle);
    const deltaLng = dx * Math.sin(angle);
    const randomLat = lat + deltaLat;
    const randomLng = lng + deltaLng;
    return { latitude: randomLat, longitude: randomLng };
};

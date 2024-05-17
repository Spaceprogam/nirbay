document.addEventListener("DOMContentLoaded", function() {
    const satellite = document.querySelector(".satellite");
    const mapContainer = document.querySelector(".map-container");
    const mapWidth = mapContainer.clientWidth;
    const mapHeight = mapContainer.clientHeight;
    const satelliteWidth = satellite.clientWidth;
    const satelliteHeight = satellite.clientHeight;
    const animationDuration = 30000; // in milliseconds, adjust as needed
    const semiMajorAxis = mapWidth / 2 - satelliteWidth / 2; // Adjusting for satellite size
    const semiMinorAxis = mapHeight / 2 - satelliteHeight / 2; // Adjusting for satellite size
    const centerX = mapWidth / 2;
    const centerY = mapHeight / 2;
    let angle = 0;

    // Move satellite across the map in an elliptical orbit
    function moveSatellite() {
        const x = centerX + semiMajorAxis * Math.cos(angle);
        const y = centerY + semiMinorAxis * Math.sin(angle);

        // Check if satellite position exceeds map boundaries
        const maxX = mapWidth - satelliteWidth;
        const maxY = mapHeight - satelliteHeight;
        const clampedX = Math.min(Math.max(x, 0), maxX);
        const clampedY = Math.min(Math.max(y, 0), maxY);

        satellite.style.left = clampedX + "px";
        satellite.style.top = clampedY + "px";

        // Increase the angle to simulate the satellite orbiting
        angle += 0.01;

        // Reset angle when it completes a full orbit
        if (angle >= Math.PI * 2) {
            angle = 0;
        }

        // Repeat the animation
        setTimeout(moveSatellite, 100);
    }

    moveSatellite(); // Start the animation
});

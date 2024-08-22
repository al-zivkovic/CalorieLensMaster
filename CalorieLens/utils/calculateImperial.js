function calculateImperialWeight(metricWeight) {
    // Convert metric weight to pounds
    const imperialWeight = metricWeight * 2.20462;
    // round to the nearest 1
    return Math.round(imperialWeight);
}

function calculateImperialHeight(metricHeight) {
    // Convert metric height to feet and inches
    const totalInches = metricHeight * 39.3701;
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return { feet, inches };
}

export { calculateImperialWeight, calculateImperialHeight };
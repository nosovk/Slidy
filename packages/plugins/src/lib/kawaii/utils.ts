/**
 * CSS `url()`
 */
const url = (value: string) => `url(${value})`;

/**
 * Random number between `min` and `max`
 */
const random = (min = 0, max = 4) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { url, random }

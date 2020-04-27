'use strict';

export function randomInt( start, end ) {
    let distance = end - start
    return start + Math.floor(Math.random() * distance);
}

// Shortest word in an array (returns length)

const findShort = (s) => Math.min.apply(null, s.split(' ').map(v => v.length))
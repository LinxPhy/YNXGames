

function UnixToDateTime(unixTimestamp) {
    return new Date(unixTimestamp * 1000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
}

module.exports = { UnixToDateTime }
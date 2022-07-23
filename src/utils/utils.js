export function dateToTimestamp(strDate){
    return Date.parse(strDate) / 1000;
}

export function arrayChoice(array, n=1) {
    return array.sort(() => .5 - Math.random()).slice(0, n) 
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
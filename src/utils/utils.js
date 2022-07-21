export function dateToTimestamp(strDate){
    return Date.parse(strDate) / 1000;
}

export function arrayChoice(array, n=1) {
    return array.sort(() => .5 - Math.random()).slice(0, n) 
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
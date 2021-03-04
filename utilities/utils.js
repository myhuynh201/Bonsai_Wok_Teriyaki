//Checks if a string exists and is not empty. Used for parameters. 
function isProvided(param) {    
    return param !== undefined && param.length > 0
}

function isSize(param) {
    return param == "small" || param == "medium" || param == "large" 
}

function isRice(param) {
    return param == "white" || param == "brown" || param == "fried" 
}

function isProtein(param) {
    return param == "chicken" || param == "chicken breast" || 
    param == "katsu" || param == "shrimp" || param == "bulgogi" || 
    param == "orange chicken" || param == "mongolian beef" || param == "broccoli beef"
}


function isBoolean(param) {
    return param == new Boolean(true) || param == "t" || param == "true" ||
            param == "y" || param == "yes" || param == "on" || param == "1" ||
            param == new Boolean(false) || param == "f" || param == "false" ||
            param == "n" || param == "no" || param == "off" || param == "0"
}

module.exports = { isProvided, isSize, isRice, isProtein, isBoolean }
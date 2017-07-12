/*  
    TASK
    Create rand() functionTakes a number argument
    Takes a number argument
    Returns a random number between 0 and that number

    PSEUDOCODE
    multiplly Math.random() by number given
    Remove decimal part
    return that remaining integer
*/

function rand(num) {
    // returns a random number between 0 and num
    return Math.floor(Math.random() * num);
}
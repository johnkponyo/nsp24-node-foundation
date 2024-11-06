/******************************************
 *****TASK 1 - String Transformations******
 *****************************************/

//a. capitalize(str)
/**
 * @param {string} str - The string to capitalize.
 * @returns {string} - The string with the first letter capitalized.
 */
function capitalize(str){
    const newString = str.replace(str[0],str[0].toUpperCase())
    return newString
}



//b. reverse(str)
/**
 * @param {string} str - The string to reverse.
 * @returns {string} - The reversed string.
 */
function reverse(str){
    const newString = str.split('').reverse().join('')
    return newString
}



//c. isPalindrome(str)
/**
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is a palindrome, otherwise false.
 */
const isPalindrome = (str) => {
    const original = str
    const reversed = str.split('').reverse('').join('')
    
    if(original === reversed){
        return true
    } else {
        return false
    }
}



//d. wordCount(str)
/**
 * @param {string} str - The string to count words in.
 * @returns {number} - The number of words in the string.
 */
const wordCount = (str) => {
    const word = str.split(' ')
    const count = word.length;
    return count
}





/******************************************
 *****TASK 2 - Array Transformations*******
 *****************************************/

//a. double(arr)
/**
 * @param {number[]} arr - The array of numbers to double.
 * @returns {number[]} - A new array with each number doubled.
 */
function double(arr){
    const newArr = []
    for(let i = 0; i < arr.length; i++){
        newArr.push(arr[i]*2)
    }

    return newArr
}



//b. filterEven(arr)
/**
 * @param {number[]} arr - The array of numbers to filter.
 * @returns {number[]} - A new array with only even numbers.
 */
function filterEven(arr){
    const newArr = []
    arr.forEach(element => {
        if(element % 2 == 0){
            newArr.push(element)
        }
    })

    return newArr
}



//c. sum(arr)
/**
 * @param {number[]} arr - The array of numbers to sum.
 * @returns {number} - The sum of all numbers in the array.
 */
function sum(arr){
    let sum = 0;
    arr.forEach(element => {
        sum += element
    });

    return sum
}



//d. average(arr)
/**
 * @param {number[]} arr - The array of numbers to calculate the average of.
 * @returns {number} - The average of the numbers in the array.
 */
function average(arr){
    let sum = 0;
    arr.forEach(element => {
        sum += element
    });

    const avg = sum/arr.length;
    return avg
}





/******************************************
 *****TASK 3 - Object Transformations******
 *****************************************/

//a. fullname(person)
/**
 * @param {Object} person - An object representing a person with `firstName` and `lastName` properties.
 * @returns {string} - The full name of the person.
 */
function fullname(person){
    return `${person.firstName} ${person['lastName']}`
}



//b. isAdult(person)
/**
 * @param {Object} person - An object representing a person with an `age` property.
 * @returns {boolean} - True if the person is an adult, otherwise false.
 */
function isAdult(person){
    return (person.age >= 18)
}



//c. filterByAge(people, minAge)
/**
 * @param {Object[]} people - An array of person objects with an `age` property.
 * @param {number} minAge - The minimum age to filter people by.
 * @returns {Object[]} - A new array with people whose age is greater than or equal to `minAge`.
 */
function filterByAge(people, minAge){
    const newPeople = []
    people.forEach(person => {
        if(person.age >= minAge){
            newPeople.push(person)
        }
    });

    return newPeople
}





/******************************************
 ******TASK 4 - Function Composition*******
 *****************************************/

//a. compose(...fns)
/** 
 * @param {...Function} fns - The functions to compose.
 * @returns {Function} - A function that applies all the composed functions to an initial value.
 */
const compose1 = (...fns) => {
    return (initialValue) => {
      return fns.reduceRight((acc, fn) => fn(acc), initialValue);
    };
  };



//b. compose2(...fns)
/**
 * @param {...Function} fns - The functions to compose.
 * @returns {Function} - A function that applies all the composed functions to an initial value.
 */
 const compose2 = (...fns) => {
   return (initialValue) => {
     return fns.reduce((acc, fn) => fn(acc), initialValue);
   };
 };



//c. reverseAndCapitalizeString(str)
/**
 * @param {string} str - The string to transform.
 * @returns {string} - The transformed string (reversed and capitalized).
 */
function reverseAndCapitalizeString(str){
    return compose1(capitalize,reverse)(str)
}



//d. doubleAndFilterEvenAndSumArrayNumbers(arr)
/**
 * @param {number[]} arr - The array of numbers to transform.
 * @returns {number} - The sum of the even numbers after doubling the array's elements.
 */
function doubleAndFilterEvenAndSumArrayNumbers(arr){
    return compose2(filterEven, double, sum)(arr)
}

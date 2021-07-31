"use strict";
/**
 *
 * @param {number} x - число, которое нужно возвести в степень.
 * @param {number} n - показатель степени.
 * @returns {number} - число x в степени n.
 */
function pow(x, n) {
  let result = 1;
  if (n == 0) return result;
  else {
    result = x * pow(x, n - 1);
    return result;
  }
}

console.log(pow(3, 0));
console.log(pow(3, 1));
console.log(pow(3, 2));
console.log(pow(3, 3));

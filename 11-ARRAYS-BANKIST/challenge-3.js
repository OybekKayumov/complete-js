// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAgeArrow = (ages) => {
  const average =  ages.map(age => age <= 2 ? 2 * age : 16 + age * 4)
                     .filter(age => age >= 18)
                     .reduce((acc, age, i, arr) => acc + age / arr.length, 0) ;
  return average;

  //* 2 and 3 average. (2+3)/2 = 2.5 === 2/2 + 3/2 = 2.5

};

const avg1Arrow = calcAverageHumanAgeArrow([5, 2, 4, 1, 15, 8, 3]);
const avg2Arrow = calcAverageHumanAgeArrow([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1Arrow, avg2Arrow);
// 44 47.333333333333336
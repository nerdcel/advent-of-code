import { transformInput, castInt } from '../libs/helper.js';

// Part 1
// ======

const part1 = input => {
  const testInput = castInt(transformInput(input));
  const subject = 2020;

  let result = 'something went wrong!';

  for (let it of testInput) {
    let test = subject - it;

    if (testInput.indexOf(test) !== -1) {
        result = test * it;
        break;
    }
  }

  return `Day 1 - Part 1: ${result}`;
}

// Part 2
// ======

const part2 = input => {
  const testInput = castInt(transformInput(input));
  const subject = 2020;

  let result = 'something went wrong!';

  for (let round1 of testInput) {
    for (let round2 of testInput) {
      for (let round3 of testInput) {
         if (round1 + round2 + round3 === 2020) {
           result = round1 * round2 * round3;
         }
      }
    }
  }

  return `Day 1 - Part 2: ${result}`;
}

export { part1, part2 }

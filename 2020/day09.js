// Part 1
// ======

import { castInt, transformInput } from '../libs/helper';

const buildCombinations = (arr, num) =>
{
    const res = [];
    let temp, i, j, max = 1 << arr.length;
    for (i = 0; i < max; i++)
    {
        temp = [];
        for (j = 0; j < arr.length; j++)
        {
            if (i & 1 << j)
            {
                temp.push(arr[j]);
            }
        }

        if (temp.length === num)
        {
            res.push(temp.reduce(function (a, b) { return parseInt(a) + parseInt(b); }));
        }
    }
    return res;
};

const findSumMatches = (target, pool) => {
    const matches = [];

    for (let i = 0; i < pool.length; i++) {
        let result = 0;
        let j = i;
        let match = [];

        do
        {
            match.push(pool[j]);
            result += pool[j];
            j++;

            if (result === target && match.length > 2) {
                matches.push(match);
                break;
            }
        } while (result < target);
    }

    return matches;
}

const part1 = input =>
{
    const numbers = castInt(transformInput(input));
    const preambleLength = 25;
    let result = 0;

    for (let i = preambleLength; i < numbers.length; i++) {
        let isValid = false;
        const start = i - preambleLength;

        const preamble = [...numbers].splice(start, preambleLength);

        for (const test of preamble) {
            if (preamble.indexOf(parseInt(numbers[i]) - parseInt(test)) !== -1) {
                isValid = true;
                break;
            }
        }

        if (isValid) continue;
        result = numbers[i];
        break;
    }

    console.log(`Day 9 - Part 1: ${result} is not valid.`);

    return {result, numbers}
};

// Part 2
// ======

const part2 = input =>
{
    const {result, numbers} = part1(input);

    const group = findSumMatches(result, numbers);

    const sorted = group[0].sort((a, b) =>
    {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    console.log(`Day 9 - Part 2: ${sorted[0] + sorted[sorted.length - 1]}.`);

    return sorted[0] + sorted[sorted.length - 1];
};

export { part1, part2 };

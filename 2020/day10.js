// Part 1
// ======

import { castInt, transformInput } from '../libs/helper';

const part1 = input =>
{
    const joltages = castInt(transformInput(input)).sort((a, b) =>
    {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    // Add 3 to highest joltage and add it to the end
    joltages.push(joltages[joltages.length - 1] + 3);

    const differences = {};

    let start = 0;
    try
    {
        for (const joltage of joltages)
        {
            const diff = joltage - start;
            start = joltage;

            if (diff > 3) throw new Error('Joltage diff is to high');

            differences[diff] = differences[diff] !== undefined
                ? differences[diff] + 1
                : 1;
        }
    } catch (e)
    {
        console.error(e.message);
    }

    console.log(
        `Day 10 - Part 1: Result -> ${differences[1] * differences[3]}`);

    return differences;
};

// Part 2
// ======

const part2 = input =>
{
    let data = castInt(transformInput(input));
    let sorted = data.sort((a, b) => a - b);
    let builtInt = parseInt(Math.max(...data) + 3);
    let l = 0;
    let diffs = {};

    sorted.unshift(0);
    sorted.push(builtInt);
    sorted = sorted.reverse();
    let poss = {};
    let len = {};
    len[builtInt] = 1;

    sorted.forEach((elem) =>
    {
        poss[elem] = sorted.filter(el => el > elem && el <= elem + 3);
        if (elem !== builtInt)
        {
            len[elem] = 0;
            for (let i = 0; i < poss[elem].length; i++)
            {
                len[elem] += len[poss[elem][i]];
            }
        }
    });

    return `Day 10 - Part two: ${len['0']}`;
};

export { part1, part2 };

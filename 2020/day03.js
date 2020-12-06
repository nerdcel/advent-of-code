// Part 1
// ======

import { transformInput } from '../libs/helper';

const hohoho = (x, y, map, hits) =>
{
    const coorinates = {
        x: 0,
        y: 0
    };

    let treeMap = [...map];
    let hitMap = hits;

    while (treeMap.length - 1 > coorinates.y)
    {
        coorinates.x += x;
        coorinates.y += y;

        if (coorinates.x > treeMap[coorinates.y].length - 1)
        {
            treeMap = expandMap(treeMap, map);
        }

        hitMap[treeMap[coorinates.y][coorinates.x]] !== undefined
            ? hitMap[treeMap[coorinates.y][coorinates.x]]++
            : null;
    }

    return hitMap;
};

const expandMap = (target, original) =>
{
    for (const key in original)
    {
        target[key] += original[key];
    }

    return target;
};

const part1 = input =>
{
    const testInput = transformInput(input);
    const hits = {
        '.': 0,
        '#': 0
    };

    let way = hohoho(3, 1, testInput, hits);

    return `Day 3 - Part 1: I passed ${way['#']} trees and ${way['.']} squares on my way`;
};

// Part 2
// ======

const part2 = input =>
{
    const testInput = transformInput(input);
    const way = [];

    way[0] = hohoho(1, 1, testInput, {
        '.': 0,
        '#': 0
    });
    way[1] = hohoho(3, 1, testInput, {
        '.': 0,
        '#': 0
    });
    way[2] = hohoho(5, 1, testInput, {
        '.': 0,
        '#': 0
    });
    way[3] = hohoho(7, 1, testInput, {
        '.': 0,
        '#': 0
    });
    way[4] = hohoho(1, 2, testInput, {
        '.': 0,
        '#': 0
    });

    let result = 1;

    for (const it of way)
    {
        result *= it['#'];
    }

    return result;
};

export { part1, part2 };

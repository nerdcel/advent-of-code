// Part 1
// ======

import { transformInput } from '../libs/helper';
import _ from 'lodash';

const getBagRules = bags =>
{
    const rules = {};

    for (const bag of bags)
    {
        const type = (bag.match(/^\s*(\w+[,\s]+\w+)/g) || []);

        if (type.length > 0)
        {
            const regex = /(\d)\s+(\w+[,\s]+\w+)/g;
            let m;

            while ((m = regex.exec(bag)) !== null)
            {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex)
                {
                    regex.lastIndex++;
                }

                rules[type] = [
                    {
                        qt : parseInt(m[1]),
                        name: m[2]
                    }, ...(rules[type] ? rules[type] : [])
                ];
            }
        }
    }

    return rules;
};

const findRecursive = (ruleSet, bag, goldBag) =>
{
    if (ruleSet[bag] !== undefined)
    {
        const directHit = _.find(ruleSet[bag], item => item.name === goldBag);

        if (directHit) {
            return bag;
        }

        for (const rule of ruleSet[bag]) {
            const result = findRecursive(ruleSet, rule.name, goldBag);

            if (result) {
                return bag;
            }
        }
    }

    return null;
};

const findBags = (ruleSets, bagCode) =>
{
    const result = [];

    for (const bag in ruleSets) {
        if (ruleSets.hasOwnProperty(bag))
            result.push(findRecursive(ruleSets, bag, bagCode))
    }

    return _.remove(result, null);
};

const findGoldBagContent = (ruleSets, bag) => {
    if (ruleSets[bag.name] === undefined) return 1;
    const bagsWithin = ruleSets[bag.name];

    let result = 1;
    for (const innerBag of bagsWithin) {
        result += innerBag.qt * findGoldBagContent(ruleSets, innerBag);
    }

    return result;
}

const part1 = input =>
{
    const ruleSets = getBagRules(transformInput(input));
    const result = findBags(ruleSets, 'shiny gold');

    return `Day 7 - Part 1: Possible bags to carry shiny bold bag are: ${result}, that means there are ${result.length} bags`;
};

// Part 2
// ======

const part2 = input =>
{
    const ruleSets = getBagRules(transformInput(input));
    const result = findGoldBagContent(ruleSets, { qt: 1, name: 'shiny gold'});

    return `Day 7 - Part 2: 1 Shiny gold bag must contain ${result - 1} bags.`;
};

export { part1, part2 };

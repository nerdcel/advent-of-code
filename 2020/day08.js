// Part 1
// ======

import { transformInput } from '../libs/helper';
import _ from 'lodash';

const transformInstructions = (input) =>
{
    const instructionSet = [];

    for (const line of input)
    {
        const [op, arg] = line.split(' ');

        instructionSet.push({
            operation: op.trim(),
            argument : parseInt(arg),
            history  : null
        });
    }

    return instructionSet;
};

const runProgram = (instrSet, result) =>
{
    let row = 0;
    let history = 1;

    try
    {

        while (instrSet[row] !== undefined)
        {
            if (instrSet[row].history !== null)
            {
                throw new Error('Programm terminated unexpected');
            }

            instrSet[row].history = history;
            history++;

            if (instrSet[row].operation === 'acc')
            {
                result += instrSet[row].argument;
                row++;
                continue;
            }

            if (instrSet[row].operation === 'jmp')
            {
                row += instrSet[row].argument;
                continue;
            }

            if (instrSet[row].operation === 'nop')
            {
                row++;
            }
        }
    } catch (e)
    {
        return {
            message: e.message,
            result,
            status : 500
        };
    }

    return {
        message: 'Finished OK',
        result,
        status : 200
    };
};

const tryFix = (instrSet, config, flip) =>
{
    if (! config.indexes.nop.length && ! config.indexes.jmp.length)
        throw new Error('No operators to flip available');

    flip[0] = flip[0] === 'nop' ? 'jmp': 'nop';
    if (!config.indexes[flip[0]].length) {
        return tryFix(instrSet, config, flip);
    }
    return fix(flip[0], config, instrSet);
};

const fix = (flip, config, instrSet) => {
    instrSet[config.indexes[flip].shift()].operation = (flip === 'jmp'? 'nop': 'jmp');

    return instrSet;
}

const fixRunProgram = (instrSet, result) =>
{
    const config = {
        indexes: {
            'nop': _.keys(_.pickBy(instrSet, { operation: 'nop' })),
            'jmp': _.keys(_.pickBy(instrSet, { operation: 'jmp' }))
        }
    };
    const flip = ['nop'];
    let riddleResult = null;

    try
    {
        do
        {
            let fixedInstrSet = tryFix(_.cloneDeep(instrSet), config, flip);
            riddleResult = runProgram(fixedInstrSet, result);
        } while (riddleResult.status === 500);

        return riddleResult;
    } catch (e) {
        console.error(e);
    }
};

const part1 = input =>
{
    const instrSet = transformInstructions(transformInput(input));
    const {
        result,
        message,
        status
    } = runProgram(instrSet, 0);

    console.log(result, message, status);

    return `Day 8 - Part 1: Result: ${result}`;
};

// Part 2
// ======

const part2 = input =>
{
    const instrSet = transformInstructions(transformInput(input));

    return fixRunProgram(instrSet, 0);

    return `Day 8 - Part 2: Result: ${fixRunProgram(instrSet, 0)}`;
};

export { part1, part2 };

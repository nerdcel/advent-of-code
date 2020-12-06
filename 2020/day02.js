import { transformInput, indexOfAll } from '../libs/helper.js';

const extractLine = line =>
{
    const _line = line.split(':');
    if (_line.length !== 2) return false;

    const _rule = _line[0].trim().split(' ');
    const _subject = _line[1].trim();
    const _range = _rule[0].split('-');
    const _verb = _rule[1].trim();

    return {
        _subject,
        _verb,
        _range
    };
};

const parseLine = line =>
{
    const { _subject, _verb, _range } = extractLine(line);
    const _occurence = (_subject.match(new RegExp(_verb, 'g')) || []).length;

    return (_occurence >= _range[0] && _occurence <= _range[1]);
};

const parseLineExt = line =>
{
    const { _subject, _verb, _range } = extractLine(line);
    const _occurence = indexOfAll(_subject, _verb);

    return (_occurence.indexOf(parseInt(_range[0])) !== -1 &&
        _occurence.indexOf(parseInt(_range[1])) === -1 ||
        _occurence.indexOf(parseInt(_range[1])) !== -1 &&
        _occurence.indexOf(parseInt(_range[0])) === -1);
};

// Part 1
// ======

const part1 = input =>
{
    const testInput = transformInput(input);

    let valid = 0;

    for (const it of testInput)
    {
        valid += parseLine(it) ? 1 : 0;
    }

    return `Day 2 - Part 1: There are ${valid} valid passwords`;
};

// Part 2
// ======

const part2 = input =>
{
    const testInput = transformInput(input);

    let valid = 0;

    for (const it of testInput)
    {
        valid += parseLineExt(it) ? 1 : 0;
    }

    return `Day 2 - Part 2: There are ${valid} valid passwords`;
};

export { part1, part2 };

// Part 1
// ======

import { transformInput } from '../libs/helper';

const getMedian = (left, right, direction) =>
{
    const median = (left + right) / 2;

    return direction === '+' ? Math.ceil(median + 0.01) : Math.floor(median);
};

const calculateSeat = (row, lower, upper, range) =>
{
    for (let i = 0; i < row.length; i++)
    {
        if ([lower, upper].indexOf(row[i]) === -1) continue;

        if (row[i].toUpperCase() === lower)
        {
            range[1] = getMedian(range[0], range[1], '-');
        }
        else
        {
            range[0] = getMedian(range[0], range[1], '+');
        }

    }

    return range;
};

const part1 = input =>
{
    const rows = transformInput(input);
    const seatIDs = [];
    const plan = [];

    for (const row of rows)
    {
        const [_row] = calculateSeat(row, 'F', 'B', [0, 127]);
        const [_seat] = calculateSeat(row, 'L', 'R', [0, 7]);
        const ID = (_row * 8) + _seat;

        seatIDs.push(ID);

        plan.push([_row, _seat, ID]);
    }

    return [seatIDs, 'The highest ID of all is; ' + seatIDs.sort((a, b) =>
    {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    }).shift(), plan];
};

// Part 2
// ======

//const part2 = input =>
//{
//    const seatedPlan = part1(input)[2];
//    const plan = [];
//    const openSeats = [];
//
//    for (let i = 0; i < 128; i++)
//    {
//        plan.push([i, ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x',]]);
//    }
//
//    for (let i = 0; i < seatedPlan.length; i++) {
//        plan[seatedPlan[i][0]][1][seatedPlan[i][1]] = seatedPlan[i][2];
//    }
//
//    for (let i = 0; i < plan.length; i++) {
//        if (plan[i][1].indexOf('x') !== -1)
//        {
//            openSeats.push(plan[i])
//        }
//    }
//
//    return openSeats;
//};

const part2 = input =>
{
    const seatIDs = part1(input)[0];
    let result = 0;

    root:
    for (let i = 0; i < 128; i++)
    {
        for (let k = 0; k < 8; k++) {
            const id = (i * 8) + k;
            const index = seatIDs.indexOf(id);

            if (index === -1 && seatIDs.indexOf(id - 1) !== -1 && seatIDs.indexOf(id + 1) !== -1) {
                result = id;
                break root;
            }
        }
    }

    return result;
};

export { part1, part2 };

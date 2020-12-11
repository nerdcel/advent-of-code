// Part 1
// ======

import { transformInput } from '../libs/helper';
import _ from 'lodash';

String.prototype.replaceAt = function (index, replacement)
{
    return this.substr(0, index) + replacement +
        this.substr(index + replacement.length);
};

const getAdjacent = (seats, row, seatNumber) =>
{
    const adjacent = {
        '.': 0,
        'L': 0,
        '#': 0
    };

//    console.log('Check seat having value: ', seats[row][seatNumber], 'at row ', row, 'and seat ', seatNumber);

    for (let checkRow = -1; checkRow <= 1; checkRow++)
    {
        const _row = row + checkRow;

        // read rows
        if (seats[_row] === undefined) continue;
        for (let checkSeat = -1; checkSeat <= 1; checkSeat++)
        {
            const _seatNumber = seatNumber + checkSeat;

            // read seat
            if (seats[_row][_seatNumber] === undefined ||
                (row === _row && seatNumber === _seatNumber)) continue;
//            console.log('check seat at row: ', _row, 'and column: ', _seatNumber);
            const seat = seats[_row][_seatNumber];
            adjacent[seat]++;
        }
    }

//    console.log(adjacent);

    return adjacent;
};

const getAdjacentAdvanced = (seats, row, col) =>
{
    const adjacent = {
        'L': 0,
        '#': 0
    };

    const directions = [
        [0,0,0],
        [0,1,0],
        [0,0,0]
    ]

    const check = (r, c) => {
        try
        {
//            console.log(directions.join('\n'));
//            console.clear();

            const seat = seats[r][c];
            if (seat !== '.') {
                adjacent[seat] += 1;
                return 1;
            }
            return 0;
        } catch (e) {
            return 0;
        }
    }

    // get straight directions up, right, down, left
    // up

    let colLeft = col;
    let colRight = col;
    // up
    for (let _row = row-1; _row >= 0; _row--) {
        colLeft--;
        colRight++;

        if (directions[0][0] && directions[0][1] && directions[0][2])
            break;
        // up
        if (!directions[0][1]) {
            directions[0][1] = check(_row, col);
        }

        // left
        if (!directions[0][0]) {
            directions[0][0] = check(_row, colLeft)
        }

        // right
        if (!directions[0][2]) {
            directions[0][2] = check(_row, colRight)
        }
    }

    colLeft = col;
    colRight = col;
    // down
    for (let _row = row+1; _row < seats.length; _row++) {
        colLeft--;
        colRight++;

        if (directions[2][0] && directions[2][1] && directions[2][2])
            break;

        // down
        if (!directions[2][1]) {
            directions[2][1] = check(_row, col);
        }

        // left
        if (!directions[2][0]) {
            directions[2][0] = check(_row, colLeft)
        }

        // right
        if (!directions[2][2]) {
            directions[2][2] = check(_row, colRight)
        }
    }
    // right
    for (let _col = col+1; _col < seats[row].length; _col++) {
        if (!directions[1][0]) {
            directions[1][0] = check(row, _col);
            continue;
        }
        break;
    }
    // left
    for (let _col = col-1; _col >= 0; _col--) {
        if (!directions[1][2]) {
            directions[1][2] = check(row, _col);
            continue;
        }
        break;
    }

    return adjacent;
};

const processSeats = (seatMap, callback, ruleset) =>
{
    const clone = _.clone(seatMap);

    for (let row = 0; row < seatMap.length; row++)
    {
        for (let seatNumber = 0; seatNumber < seatMap[row].length; seatNumber++)
        {
//            console.log(seatMap);
            const seat = seatMap[row][seatNumber];

            if (seat === '.')
            {
                seatMap[row] = seatMap[row].replaceAt(seatNumber, '.');
                continue;
            }

            const adjacent = callback(
                clone, row, seatNumber);

            if (seat === 'L' && adjacent['#'] === 0)
            {
                seatMap[row] = seatMap[row].replaceAt(seatNumber, '#');
//                console.log('Seat becomes #.', 'Occupied adjacent: ', adjacent['#']);
                continue;
            }

            if (seat === '#' && adjacent['#'] >= ruleset.minOccupied)
            {
                seatMap[row] = seatMap[row].replaceAt(seatNumber, 'L');
//                console.log('Seat becomes L.', 'Occupied adjacent: ', adjacent['#']);
                continue;
            }

            seatMap[row] = seatMap[row].replaceAt(seatNumber, seat);
        }
    }

//    console.log(seatMap.join('\n'));

    if (_.isEqual(
        JSON.stringify(seatMap), JSON.stringify(clone))) return seatMap;
    return processSeats([...seatMap], callback, ruleset);
};

const part1 = input =>
{
    let seats = transformInput(input);
    const ruleset = { minOccupied: 4 }
    const processedSeats = processSeats([...seats], getAdjacent, ruleset);

    return 'Day 11 - Part 1: ' + _.reduce(processedSeats, (sum, m) =>
    {
        return _.reduce(m.split(''), (sum2, n) =>
        {
            return n === '#' ? sum2+1 : sum2;
        }, sum);
    }, 0);
};

// Part 2
// ======

const part2 = input =>
{
    let seats = transformInput(input);
    const ruleset = { minOccupied: 5 }
    const processedSeats = processSeats([...seats], getAdjacentAdvanced, ruleset);

    return 'Day 11 - Part 2: ' + _.reduce(processedSeats, (sum, m) =>
    {
        return _.reduce(m.split(''), (sum2, n) =>
        {
            return n === '#' ? sum2+1 : sum2;
        }, sum);
    }, 0);
};

export { part1, part2 };

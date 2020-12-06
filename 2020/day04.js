// Part 1
// ======

import _ from 'lodash';
import {
    transformInputFiles,
    transformInputFields,
    isHcl,
    isByr,
    isIyr,
    isEyr,
    isHgt,
    isEcl,
    isPid
} from '../libs/helper';

const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
    //'cid',
];

const mappedValidators = {
    'byr': isByr,
    'iyr': isIyr,
    'eyr': isEyr,
    'hgt': isHgt,
    'hcl': isHcl,
    'ecl': isEcl,
    'pid': isPid
};

const part1 = input =>
{
    const passPorts = transformInputFiles(input);
    let valid = 0;
    let invalid = 0;

    for (const passPort of passPorts)
    {
        const fields = transformInputFields(passPort).
        map(item => (item.split(':')[0]));

        if (_.intersection(requiredFields, fields).length ===
            requiredFields.length)
        {
            valid++;
            continue;
        }

        invalid++;
    }

    return `Day 4 - Part 1: There are ${valid} valid and ${invalid} invalid passports.`;
};

// Part 2
// ======

const part2 = input =>
{
    const passPorts = transformInputFiles(input);
    let valid = 0;
    let invalid = 0;

    nest1:
        for (const passPort of passPorts)
        {
            const fieldsValues = transformInputFields(passPort);
            const fields = fieldsValues.map(item => (item.split(':')[0]));

            if (_.intersection(requiredFields, fields).length ===
                requiredFields.length)
            {
                for (const pass of fieldsValues)
                {
                    const [_field, _value] = pass.split(':');

                    if (typeof mappedValidators[_field] === 'function')
                    {
                        const result = mappedValidators[_field](_value);
//                        console.log(
//                            `Test ${_field} having value: ${_value} => ${result
//                                ? 'passed'
//                                : 'failed'}`);

                        if (result)
                            continue;
                        invalid++;
                        continue nest1;
                    }
                }

                valid++;
                continue;
            }

            invalid++;
        }

    return `Day 4 - Part 2: There are ${valid} valid and ${invalid} invalid passports.`;
};

export { part1, part2 };

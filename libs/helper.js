const transformInput = (input) => (input.split("\n"));

const transformInputFiles = (input) => (input.split("\n\n"));

const transformInputFields = (input) => (input.split(/[\n|\s]+/));

const castInt = (input) => (input.map(val => (parseInt(val))));

const indexOfAll = (arr, val) => {
    const indexes = [];
    let i = -1;

    while ((i = arr.indexOf(val, i+1)) !== -1){
        indexes.push(i + 1);
    }

    return indexes;
}

const isHcl = hcl => (RegExp(/[#][0-9A-Fa-f]{6}/g).test(hcl));
const isByr = byr => (byr >= 1920 && byr <=2002);
const isIyr = iyr => (iyr >= 2010 && iyr <=2020);
const isEyr = eyr => (eyr >= 2020 && eyr <=2030);
const isHgt = hgt => {
    const validPhrase = RegExp(/[\d]+(in|cm)/g).test(hgt);
    const unit = (hgt.match(/(?<=[\d])(in|cm)/g) || ['']);
    const value = (hgt.match(/[\d]+(?=in|cm)/g) || [0]);

    if (validPhrase) {
        if (unit[0] === 'in') return value[0] >= 59 && value[0] <= 76;
        if (unit[0] === 'cm') return value[0] >= 150 && value[0] <= 193;
    }
    return false;
};
const isEcl = ecl => (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(ecl) !== -1);
const isPid = pid => (pid.length === 9 && (pid.match(/(\D)/g) || []).length === 0)

export {
    transformInput,
    transformInputFiles,
    transformInputFields,
    castInt,
    indexOfAll,
    isHcl,
    isByr,
    isIyr,
    isEyr,
    isHgt,
    isEcl,
    isPid
};

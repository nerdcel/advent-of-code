// Part 1
// ======

import { transformInput as getPeople, transformInputFiles as getGroups } from '../libs/helper';
import _ from 'lodash';

const part1 = input => {
  let countYes = 0;
  const groups = getGroups(input);

  for (let group of groups) {
    group = _.union(_.flattenDeep(_.map(getPeople(group), item => {
      return item.length > 1 ? [...item.split('')] : item;
    })));
    countYes += group.length;
  }

  return countYes;
}

// Part 2
// ======

const part2 = input => {
  let countYes = 0;
  const groups = getGroups(input);

  for (let group of groups) {
    const answers = [];

    _.each(getPeople(group), item => {
      answers.push(_.union(_.flattenDeep([...item.split('')])));
    })

    countYes += _.intersection(...answers).length
  }

  return countYes;
}

export { part1, part2 }

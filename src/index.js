import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

export default function showDiff(filepath1, filepath2) {
   const data1 = readFileSync(filepath1, { encoding: 'utf-8' })
   const data2 = readFileSync(filepath2, { encoding: 'utf-8' })
   
   const parsedObj1 = JSON.parse(data1)
   const parsedObj2 = JSON.parse(data2)
   
  
   generateDiff(parsedObj1, parsedObj2)
}

function generateDiff (obj1, obj2) {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  
  const sortedKeys = _.union(keys1, keys2).sort()
  
  const result = ['{'];
  for (let key of sortedKeys) {
    if (Object.hasOwn(obj1, key)&&! Object.hasOwn(obj2, key)) {
    result.push(`  - ${key}: ${obj1[key]}`)
   } else if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
    result.push(`  + ${key}: ${obj2[key]}`)
   } else if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
    if (obj1[key] === obj2[key]) {
    result.push(`    ${key}: ${obj2[key]}`)
   } else if ((obj1[key] !== obj2[key])) {
    result.push(`  - ${key}: ${obj1[key]}`)
    result.push(`  + ${key}: ${obj2[key]}`)
   }
  }
}
  result.push('}')
  console.log(result.join('\n'))
}
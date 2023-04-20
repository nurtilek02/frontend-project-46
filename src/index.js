import { readFileSync } from 'node:fs';

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
  console.log(keys1, keys2)
}
import fs from 'fs';
import path from 'path'
import {parseData} from './parsers';
import {InputData} from './models/input-data';
import {compute} from './solution/compute';
import {stringifyOutput} from './solution/stringify-output';

const fileName = 'e_so_many_books';


const fileStr = fs.readFileSync(
    path.join(__dirname, `../input/${fileName}.txt`),
    {encoding: 'ascii'}
);

const data: InputData = parseData(fileStr);

console.log('STARTED');

const out = compute(data);

console.log('DONE');

// console.log(out);
// console.log(stringifyOutput(out));

// console.log(JSON.stringify(precomputed, null, 2));

/*
const scanner: BooksScanner = new BooksScanner(data);

scanner.enqueueLibraries(
    ...precomputed
        .sort((p1, p2) => p1.priority - p2.priority )
        .map((lib) => lib.id)
);

scanner.start();

console.log(scanner.totalScore);
*/

// data.libraries


/*
console.log(data);

fs.writeFileSync(
    path.join(__dirname, `../output/${fileName}.json`),
    JSON.stringify(data),
    {encoding: 'ascii'}
);*/



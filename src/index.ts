import fs from 'fs';
import path from 'path'
import {parseData} from './parsers';
import {InputData} from './models/input-data';

const fileName = 'a_example';

const fileStr = fs.readFileSync(
    path.join(__dirname, `../input/${fileName}.txt`),
    {encoding: 'ascii'}
);

const data: InputData = parseData(fileStr);

// data.libraries


/*
console.log(data);

fs.writeFileSync(
    path.join(__dirname, `../output/${fileName}.json`),
    JSON.stringify(data),
    {encoding: 'ascii'}
);*/



import {Metadata} from '../models/metadata';
import {parseMetadata} from './metadata-parser';
import {Book} from '../models/book';
import {parseBooks} from './books-parser';
import {Library} from '../models/library';
import {parseLibrary} from './library-parser';
import {InputData} from '../models/input-data';

export function parseData(inputStr: string): InputData {
    const lines: string[] = inputStr.split('\n').filter(Boolean);
    const meta: Metadata = parseMetadata(lines[0]);
    const books: Book[] = parseBooks(lines[1]);
    const libraries: Library[] = [];

    let lineIndex = 2;
    for (let libId = 0; libId < meta.librariesCount; libId++, lineIndex+=2) {
        libraries.push(
            parseLibrary(libId, lines[lineIndex], lines[lineIndex + 1])(books)
        );
    }

    return {
        meta,
        books,
        libraries
    };
}

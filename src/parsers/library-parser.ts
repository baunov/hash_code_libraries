import {Library} from '../models/library';
import {parseBooksIds} from './books-ids-parser';
import {Book} from '../models/book';

export type LibraryCreator = (books: Book[]) => Library;

export function parseLibrary(id: number, libraryMetaStr: string, libraryBooksIdsStr: string): LibraryCreator {
    const libProps = libraryMetaStr.split(' ')
        .map((propStr) => parseInt(propStr));
    const booksIds = parseBooksIds(libraryBooksIdsStr);

    return (books: Book[]) => {
        return {
            id,
            booksCount: libProps[0],
            daysToSignUp: libProps[1],
            booksPerDay: libProps[2],
            books: booksIds.map((id) => books[id])
        };
    };
}

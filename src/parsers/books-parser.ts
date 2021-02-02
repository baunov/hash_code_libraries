import {Book} from '../models/book';

export function parseBooks(booksStr: string): Book[] {
    return booksStr.split(' ')
        .map((scoreStr) => parseInt(scoreStr))
        .map((score, index) => ({score, id: index}));
}

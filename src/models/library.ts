import {Book} from './book';

export interface Library {
    id: number;
    daysToSignUp: number;
    booksPerDay: number;
    booksCount: number;
    books: Book[];
}

export interface LibraryPrecomputed {
    id: number;
    daysToSignUp: number;
    maxTotalScore: number;
    sortedBooks: Book[];
}

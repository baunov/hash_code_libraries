import {Library} from './library';
import {Book} from './book';
import {Metadata} from './metadata';

export interface InputData {
    libraries: Library[];
    books: Book[];
    meta: Metadata;
}

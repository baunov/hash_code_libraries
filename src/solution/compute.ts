import {Library, LibraryPrecomputed} from '../models/library';
import {Book} from '../models/book';
import {InputData} from '../models/input-data';

export interface OutputData {
    libsIds: number[];
    booksIdsByLibId: Record<number, number[]>;
}

export function compute(inputData: InputData): OutputData {
    const processedBooks: Set<Book> = new Set();
    const processedLibs: Set<Library> = new Set();

    const output: OutputData = {
        libsIds: [],
        booksIdsByLibId: {}
    };

    function getPriorityLib(libs: LibraryPrecomputed[]): LibraryPrecomputed {
        let topLib = libs[0];
        libs.forEach(l => {
            if (l.maxTotalScore > topLib.maxTotalScore) {
                topLib = l;
            }
        });
        return topLib;
    }

    function computeLibrary(lib: Library, daysRemaining: number): LibraryPrecomputed {
        const daysLeftAfterSignUp = daysRemaining - lib.daysToSignUp;
        const booksCanBeProcessed = Math.min(daysLeftAfterSignUp * lib.booksPerDay, lib.booksCount);
        const sortedBooks = lib.books.slice()
            .filter((b) => !processedBooks.has(b))
            .sort((b1, b2) => b1.score - b2.score)
            .slice(0, booksCanBeProcessed);

        const maxTotalScore = sortedBooks.reduce((sum, b) => sum + b.score, 0) / lib.daysToSignUp;
        return {
            id: lib.id,
            daysToSignUp: lib.daysToSignUp,
            maxTotalScore,
            sortedBooks
        };
    }

    let daysLeft = inputData.meta.daysTotal;
    while (daysLeft > 0) {
        const computedLibs = inputData.libraries
            .filter((lib) => !processedLibs.has(lib) && lib.daysToSignUp < daysLeft)
            .map((lib) => computeLibrary(lib, daysLeft));

        if (computedLibs.length === 0) {
            break;
        }

        const pickedLib = getPriorityLib(computedLibs);

        processedLibs.add(inputData.libraries[pickedLib.id]);
        pickedLib.sortedBooks.forEach((b) => {
            processedBooks.add(b);
        });

        output.libsIds.push(pickedLib.id);
        output.booksIdsByLibId[pickedLib.id] = pickedLib.sortedBooks.map((b) => b.id);

        daysLeft -= pickedLib.daysToSignUp;
    }


    let totalScore = 0;
    output.libsIds.forEach((id) => {
        output.booksIdsByLibId[id].forEach((bId) => {
            totalScore += inputData.books[bId].score;
        })
    });

    console.log(totalScore);

    return output;
}

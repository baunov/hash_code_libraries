import {InputData} from '../models/input-data';

export class BooksScanner {
    private waitingLibsIds: number[] = [];
    private processingLibsIds: number[] = [];

    private processedBooksCountByLibId: Record<number, number> = {};
    private processedBooksIds: Set<number> = new Set();

    private curWaitingLibId: number;
    private curWaitRemaining = 0;

    private processedBooksByLibId: {[libId: number]: number[]} = {};

    private readonly daysTotal: number;
    private _totalScore: number = 0;
    constructor(private readonly inputData: InputData) {
        this.daysTotal = this.inputData.meta.daysTotal;
    }

    get totalScore(): number {
        return this._totalScore;
    }

    enqueueLibraries(...ids: number[]): void {
        this.waitingLibsIds.push(...ids);
    }

    start(): void {
        this.processedBooksIds = new Set();
        this.startNextLibrarySignUp();
        for (let day = 0; day < this.daysTotal; day++) {
            this.onDayTick();
        }
        this.calculateTotalScore();
    }

    private onDayTick(): void {
        this.curWaitRemaining --;
        if (this.curWaitRemaining <= 0) {
            this.processingLibsIds.push(this.curWaitingLibId);
            this.processedBooksCountByLibId[this.curWaitingLibId] = 0;
            this.processedBooksByLibId[this.curWaitingLibId] = [];
            if (this.waitingLibsIds.length > 0) {
                this.startNextLibrarySignUp();
            }
        }

        // process libraries that completed sign-up process
        this.processingLibsIds.forEach((libId: number) => {
            const start = this.processedBooksCountByLibId[libId];
            const perDay = this.inputData.libraries[libId].booksPerDay;
            const curLibBooks = this.inputData.libraries[libId].books;
            const end = Math.min(start + perDay, curLibBooks.length);

            const todayProcessedBooks = curLibBooks
                .slice(start, end)
                .map((b) => b.id)
                .filter((bId) => !this.processedBooksIds.has(bId));

            this.processedBooksByLibId[libId] = [
                ...this.processedBooksByLibId[libId],
                ...todayProcessedBooks
            ];
            this.processedBooksCountByLibId[libId] += perDay;

            todayProcessedBooks.forEach((id) => {
                this.processedBooksIds.add(id);
            });
        })
    }

    private startNextLibrarySignUp(): void {
        this.curWaitingLibId = this.waitingLibsIds.shift();
        this.curWaitRemaining = this.inputData.libraries[this.curWaitingLibId].daysToSignUp;
        console.log(this.curWaitingLibId);
    }

    private calculateTotalScore(): void {
        this._totalScore = 0;
        this.processedBooksIds.forEach((id) => {
            this._totalScore += this.inputData.books[id].score;
        })
    }
}

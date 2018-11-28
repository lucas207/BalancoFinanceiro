export class Expense {
    rowid: number;
    date: string;//:Date
    type: string;
    description: string;
    amount: number;
    //location: geolocation

    constructor() {
        // this.rowid=0, this.date="", this.type="", this.description="", this.amount=0;
    }
}


export function createDatesArr(start: Date, end: Date): Date[] {
    let date = new Date(start.getTime());
    let datesArr = [];
    while (date <= end) {
        datesArr.push(new Date(date.getTime()));
        date.setDate(date.getDate() + 1);
    }
    return datesArr;
}

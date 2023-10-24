export function DateToShortDate(date: Date, number: number = 0): Date {
    var it = date.toString();
    var value = "";
    for (number; number < 10; number++) {
        value = value + it[number];
    }
    const result: any = value;
    return result;
}
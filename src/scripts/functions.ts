function padLeadingZeros(num: number, size: number): string {
    let s : string = <String> num.toString(10)+"";
    while (s.length < size) s = "0" + s;
    return s;
}

export { padLeadingZeros };
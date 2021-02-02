
export function parseBooksIds(idsStr: string): number[] {
    return idsStr.split(' ').map((idStr) => parseInt(idStr));
}

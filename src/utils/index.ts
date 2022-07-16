import { MovieModel } from "../models/reduxModel";

export const chunk = (arr: MovieModel[], chunkSize: number) => {
    if (chunkSize <= 0) throw new Error("Invalid chunk size");
    var rows = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize)
        rows.push(arr.slice(i, i + chunkSize));
    return rows;
}

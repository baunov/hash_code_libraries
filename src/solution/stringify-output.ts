import {OutputData} from './compute';

export function stringifyOutput(outputData: OutputData): string {
    const libsCountStr = outputData.libsIds.length.toString();
    const libsStr = outputData.libsIds.map((lId) => {
        const booksStr = outputData.booksIdsByLibId[lId].join(' ');
        return [
            `${lId} ${outputData.booksIdsByLibId[lId].length}`,
            booksStr
        ].join('\n');
    }).join('\n');

    return [libsCountStr, libsStr].join('\n');
}

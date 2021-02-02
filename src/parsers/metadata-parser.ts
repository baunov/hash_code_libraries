import {Metadata} from '../models/metadata';

export function parseMetadata(metadataStr: string): Metadata {
    const metaAr: number[] = metadataStr.split(' ').map((s) => parseInt(s));
    return {
        booksCount: (metaAr[0] || 0),
        librariesCount: (metaAr[1] || 0),
        daysTotal: (metaAr[2] || 0),
    };
}

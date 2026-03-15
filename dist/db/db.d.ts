import { UrlEntry } from "./db.types";
export declare function saveNewToMap(shortUrl: string, longUrl: string): void;
export declare function loadUrlMap(): void;
export declare function getLongByShort(shortId: string): string;
export declare function deleteSingleEntry(shortId: string): void;
export declare function getUrlMap(): Map<string, UrlEntry>;
export declare function overrideMap(newMap: Map<string, UrlEntry>): void;
export declare function overrideSingleShort(shortId: string, newLong: string): void;
export declare function hasShortId(shortId: string): boolean;
//# sourceMappingURL=db.d.ts.map
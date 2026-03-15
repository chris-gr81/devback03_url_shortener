import { UrlEntry } from "../db/db.types";
export declare function jsonToMap(data: string): Map<string, UrlEntry>;
export declare function isValidUrl(parsedUrl: string): boolean;
export declare function isValidShortId(shortId: unknown): shortId is string;
export declare function isValidLongUrl(longUrl: unknown): longUrl is string;
//# sourceMappingURL=transform.utils.d.ts.map
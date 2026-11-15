import type { CompressionState } from "./types.js";
/** #5765: per-id outcome of a retire/restore/rewrite operation.
 *  `applied` = state changed; `noop` = already in the requested state
 *  (idempotent); `failed` = rejected with a model-readable reason. */
export interface BlockOpOutcome {
    applied: string[];
    noop: string[];
    failed: Array<{
        id: string;
        reason: string;
    }>;
}
/** #5765 retire: mark active blocks retired — their summaries leave the
 *  resident view (prune skips their anchors) while folded messages stay
 *  covered and decompress/search_context keep working. Idempotent. */
export declare function retireBlocks(state: CompressionState, rawIds: string[]): BlockOpOutcome;
/** #5765 restore: undo retire — the block's summary re-enters the resident
 *  view on the next rebuild. Idempotent. */
export declare function restoreBlocks(state: CompressionState, rawIds: string[]): BlockOpOutcome;
/** #5765 rewrite: replace an active block's summary with externally supplied
 *  text — no re-compression, no regeneration. The previous summary is kept one
 *  step deep (`previousSummary`) so the operation is roll-backable; a further
 *  rewrite overwrites that slot. `compressedTokens` is untouched (it records
 *  the original fold's input size, not the summary's). Returns the char counts
 *  before/after for the receipt. */
export declare function rewriteBlockSummary(state: CompressionState, raw: string, newSummary: string): {
    ok: true;
    blockId: string;
    prevChars: number;
    newChars: number;
} | {
    ok: false;
    id: string;
    reason: string;
};
//# sourceMappingURL=block-ops.d.ts.map
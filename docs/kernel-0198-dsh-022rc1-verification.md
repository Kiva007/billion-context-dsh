# Kernel 0.0.198 / DSH 0.2.2-rc.1 verification

## Scope and provenance

Isolated branch upgrade/kernel-0198-dsh-022rc1 preserves the original local rc.5 patch. No live profile, running plugin, credentials, CI or global runtime was changed. Exact kernel source: ranxianglei/billion-context commit 3e42aae8bfa6d2f3bf48d376eaaaac27afbcf806, kernel version 0.0.198; 254 upstream files are SHA-256 pinned in vendor/acp-kernel/snapshot.json. All kernel algorithms remain unchanged. Root build inlines the file dependency; upstream license and provenance ship with the package.

## Exact host dependency graph

Development and transitive DSH closure: 55 installed lockfile package entries, all 0.2.2-rc.1. No old dsh-invariants package remains (not published for rc.1 and unused). Cordis 4.1.0, loader 1.1.0, Schemastery 3.19.0 and Cosmokit 1.9.0 match published rc.1 requirements. Installation uses no force/legacy-peer-deps and disables lifecycle scripts. Peer additions are exact versions, not an unverified widened release band.

## Required adapter changes

- Kernel recent-message default is 3; host remains stricter at 5 surface nodes. This is not ref corruption. Empty host-safe recommendations must replace raw kernel candidates with a truthful notice; string-only upstream hints are translated into executable DSH array calls. Core algorithms and custom prompt semantics are preserved.
- Model capacity uses captured pre-step modelSelection, or current selection when no step capture is supplied. A pending route cannot borrow the old projection window. Compression provenance and overflow remain pinned to the actual request route.
- JSONL persistence changed from default constructor to a named plugin. Durability tests mount the real plugin and reopen actual saved logs. Only absent zstd APIs may skip tests; import or API failures are not swallowed.
- Corrected preexisting fallback accounting drift: nested tool-result structural JSON, system-only framing, image offloaded excluded from fixed heuristic. Prefer host measured heuristic prices, then official bound estimator, then parity mirror. Routed visual prices never become durable shadow claims.

## Verification evidence

Unchanged upstream kernel suite: 1640 passed, 0 failed, 0 skipped. Host model/window/durability/overflow focused suite: 46 passed, 0 skipped. Fixed-price parity/shadow-price focused suite: 20 passed, 0 skipped. Final aggregate on Node 24.21.0: strict typecheck and tsup/declaration build passed; host suite 437 total, 426 passed, 0 failed, 11 skipped. All 11 skips are explicitly legacy installSection-only settings cases; current SettingsForms cases and both real JSONL durability roundtrips ran. All 5 native-tool fake-provider e2e scenarios passed (compress, nudge cadence, decompress, status, overflow retry), including wire prefix/tool-schema stability. npm ls --all completed without invalid peers. A second clean directory completed npm ci --ignore-scripts from the lockfile (exit 0), with no borrowed node_modules or install hooks. Packed artifact retains kernel license/provenance and contains no runtime acp-kernel import or dependency lifecycle hook. PTC execution, live desktop/profile replacement and real-provider quality are not tested; PTC runtime implementation is not part of this isolated test installation. No real-provider quality, desktop UI, or in-place deployment claim is made by fake-provider tests.

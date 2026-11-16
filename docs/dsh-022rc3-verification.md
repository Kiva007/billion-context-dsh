# v0.2.272 — DSH 0.2.2-rc.3 compatibility

The maintained fork targets exact 0.2.2-rc.3. All 57 installed DSH package entries in package-lock.json resolve to rc.3; npm ls --all and clean npm ci --ignore-scripts pass without force or legacy-peer-deps. Historical rc.1/rc.5 peer exceptions remain, with only exact rc.3 added (rc.2/rc.4/final remain rejected).

The kernel stays unchanged acp-kernel 0.0.198 from commit 3e42aae8bfa6d2f3bf48d376eaaaac27afbcf806. No algorithm changes, no new proxy or public configuration. Existing durable-surface adaptation remains; the rebuilt dist is byte-identical to v0.2.271 because production adapter code did not need alteration.

Validation on Node 24.21.0: strict typecheck and build pass; 439 host tests total, 428 pass, 0 fail, 11 explicitly legacy-settings-only skips; real JSONL persistence roundtrips execute. All five native fake-provider e2e scenarios pass: compress, nudge cadence, decompress, acp_status, overflow retry. Tool-schema and prompt-prefix wire stability gates pass. New regression tests prove exact target version/dev pins and reject neighboring unverified versions (red before manifest changes, green after).

No PTC executor, real-provider quality or live desktop deployment claim. This release is uploaded only to the personal GitHub fork; no npm publication or running profile switch.

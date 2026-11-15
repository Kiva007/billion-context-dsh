# Kernel 0.0.198 and DSH 0.2.2-rc.1 upgrade

User approved the upgrade after the feasibility assessment. Preserve the DSH-native durable surface architecture, four tools, append-only history and existing guards. No proxy, live profile switch, publish, CI changes or install lifecycle hooks.

1. Record clean baseline and audit exact rc.1 dependency/peer closure.
2. Vendor unchanged kernel 0.0.198 source and built artifacts from ranxianglei/billion-context commit 3e42aae8bfa6d2f3bf48d376eaaaac27afbcf806 under vendor/acp-kernel; consume via file:vendor/acp-kernel and inline with tsup. Record source hashes and attribution.
3. Write failing regression tests for executable seq-array nudge hints, including host-guarded empty ranges. Fix adapter dialect wiring without changing kernel algorithms. Rebaseline only proven upstream changes.
4. Pin complete available DSH 0.2.2-rc.1 closure; replace retired packages only using verified upstream interfaces. Preserve original user rc.5 compatibility patch and add exact rc.1 admission tests.
5. Run typecheck, unit tests, build, all fake-provider e2e and actual persistence reload. Assert registration, shadow-price accounting and checkpoint preservation. Do not hide supported-runtime import errors as skips.
6. Check installable artifact has no runtime kernel dependency or lifecycle hooks; review source hashes and final diff; document verification.

Audit new recent-message and pressure-gating defaults explicitly; no unrelated features or configuration surfaces. Lead owns vendor, manifest/lock, packaging, docs and integration. Initial subagents are read-only audits; implementation scopes will be disjoint.

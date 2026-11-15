import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const vendor = new URL('../vendor/acp-kernel/', import.meta.url)
test('vendored kernel source is pinned byte-for-byte to its upstream commit', () => {
  const snapshot = JSON.parse(readFileSync(new URL('snapshot.json', vendor), 'utf8')) as { version: string; commit: string; files: Record<string, string> }
  assert.equal(snapshot.version, '0.0.198')
  assert.equal(snapshot.commit, '3e42aae8bfa6d2f3bf48d376eaaaac27afbcf806')
  assert.ok(Object.keys(snapshot.files).length > 100)
  for (const [path, expected] of Object.entries(snapshot.files)) {
    assert.equal(createHash('sha256').update(readFileSync(new URL(path, vendor))).digest('hex'), expected, path)
  }
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { devDependencies: Record<string, string> }
  assert.equal(pkg.devDependencies['acp-kernel'], 'file:vendor/acp-kernel')
})

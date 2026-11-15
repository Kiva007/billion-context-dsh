import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import semver from 'semver'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { peerDependencies: Record<string, string> }
test('exact DSH 0.2.2-rc.1 is admitted without admitting unverified neighboring releases', () => {
  for (const [name, range] of Object.entries(pkg.peerDependencies)) {
    if (!name.startsWith('@deepseek-ai/dsh-')) continue
    assert.ok(semver.satisfies('0.2.2-rc.1', range, { includePrerelease: true }), name)
    for (const version of ['0.2.1-rc.4', '0.2.1-rc.6', '0.2.1', '0.2.2-rc.2', '0.2.2', '0.2.3-rc.1']) {
      assert.equal(semver.satisfies(version, range, { includePrerelease: true }), false, name + ': ' + version)
    }
  }
})

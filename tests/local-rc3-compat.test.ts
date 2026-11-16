import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import semver from 'semver'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { version: string; peerDependencies: Record<string, string>; devDependencies: Record<string, string> }
test('exact rc.3 target is admitted without widening to unverified rc.2 or rc.4', () => {
  for (const [name, range] of Object.entries(pkg.peerDependencies)) {
    if (!name.startsWith('@deepseek-ai/dsh-')) continue
    assert.ok(semver.satisfies('0.2.2-rc.3', range, { includePrerelease: true }), name)
    for (const version of ['0.2.2-rc.2', '0.2.2-rc.4', '0.2.2', '0.2.3-rc.1']) assert.equal(semver.satisfies(version, range, { includePrerelease: true }), false, name + ': ' + version)
  }
})
test('v0.2.272 development baseline uses only exact rc.3 DSH packages', () => {
  assert.equal(pkg.version, '0.2.272')
  for (const [name, version] of Object.entries(pkg.devDependencies)) if (name.startsWith('@deepseek-ai/dsh-')) assert.equal(version, '0.2.2-rc.3', name)
})

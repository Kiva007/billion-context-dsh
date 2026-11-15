import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import semver from 'semver'
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
test('local compatibility admits only additionally verified 0.2.1-rc.5 host', () => {
 for (const [name, range] of Object.entries(pkg.peerDependencies) as [string,string][]) {
  if (!name.startsWith('@deepseek-ai/dsh-')) continue
  assert(semver.satisfies('0.2.1-rc.5', range, {includePrerelease:true}), `${name}: rc.5 must be admitted`)
  for (const v of ['0.2.1-rc.4','0.2.1-rc.6','0.2.1','0.2.2-rc.2']) assert(!semver.satisfies(v,range,{includePrerelease:true}), `${name}: ${v} not verified`)
 }
})

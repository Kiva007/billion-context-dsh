import { test } from 'node:test'
import assert from 'node:assert/strict'
import { estimateContent, estimateMessage, estimateStructuralBlock } from '@deepseek-ai/dsh-token-meter/estimate'
import { createUserMessage, type ContentBlock } from '@deepseek-ai/dsh-llm'
import { Session, deriveEventMessage } from '@deepseek-ai/dsh-session'
import { Context } from '@deepseek-ai/cordis'
import { TokenMeter } from '@deepseek-ai/dsh-token-meter'
import {
  estimateHostContent, estimateHostMessage, hostMediaStructuralPrice,
  hostPriceEvent, shadowedTokensViaMeter, mediaPriceViaMeter,
} from '../src/host-tokens.ts'

// The published estimator is the oracle, not another copy of its arithmetic.
for (const [name, blocks] of [
  ['CJK text', [{ type: 'text', text: '中文面试准备与安全算术' }]],
  ['reasoning', [{ type: 'reasoning', text: 'check ledger' }]],
  ['tool call', [{ type: 'tool-call', id: 'c1', name: 'read', arguments: '{"path":"a"}' }]],
  ['legacy nested result', [{ type: 'tool-result', toolCallId: 'c1', content: [{ type: 'text', text: '中文结果' }] }]],
  ['legacy string result', [{ type: 'tool-result', toolCallId: 'c1', content: '中文结果' }]],
  ['extension block', [{ type: 'extension', payload: { text: 'keep all fields' } }]],
] as const) {
  test('fallback content agrees with rc1: ' + name, () => {
    assert.equal(estimateHostContent(blocks), estimateContent(blocks as unknown as ContentBlock[]))
  })
}

for (const content of [[], [{ type: 'text', text: 'a' }, { type: 'text', text: '中文' }]] as const) {
  test('system framing agrees with rc1 for ' + content.length + ' blocks', () => {
    const message = { role: 'system' as const, content }
    assert.equal(estimateHostMessage(message), estimateMessage(message))
  })
}

test('fixed image price ignores offloaded without mutating the reference', () => {
  const image = { type: 'image' as const, attachmentId: 'sha256:abc', mimeType: 'image/png' }
  const offloaded = { ...image, offloaded: true }
  const before = JSON.stringify(offloaded)
  const expected = estimateStructuralBlock(image as unknown as ContentBlock)
  assert.equal(estimateHostContent([offloaded]), expected)
  assert.equal(hostMediaStructuralPrice([offloaded]), expected)
  assert.equal(JSON.stringify(offloaded), before)
})

function fixture(): { session: Session; seq: number } {
  const session = Session.create('estimator-parity')
  session.append('turn/start', { turn: 1 })
  session.append('step/start', { turn: 1, step: 1 })
  const event = session.append('user/message', createUserMessage({
    content: [{ type: 'text', text: '中文算术安全' }], source: { kind: 'user' },
  }), { surfaceOp: 'append' })
  return { session, seq: event.seq }
}

test('absent, throwing and incomplete meter use the published fixed vocabulary', () => {
  const { session, seq } = fixture()
  const message = deriveEventMessage(session.eventAt(seq))!
  const expected = estimateMessage(message)
  for (const ctx of [undefined,
    { get: () => ({ measure() { throw new Error('unavailable') } }) },
    { get: () => ({ measure: () => ({ nodes: [] }) }) },
  ]) assert.equal(shadowedTokensViaMeter(session, [seq], ctx), expected)
  assert.equal(hostPriceEvent(session.eventAt(seq)), expected)
})

test('real published meter estimator remains usable when its measurement is unavailable', async () => {
  const ctx = new Context()
  await ctx.plugin(TokenMeter)
  const meter = ctx.get('tokenMeter') as TokenMeter
  const { session, seq } = fixture()
  const fallback = { get: () => ({
    measure() { throw new Error('measurement unavailable') },
    estimateMessage: meter.estimateMessage.bind(meter),
  }) }
  assert.equal(shadowedTokensViaMeter(session, [seq], fallback), estimateMessage(deriveEventMessage(session.eventAt(seq))!))
})

test('available official estimateMessage prices fallback when measure fails', () => {
  const { session, seq } = fixture()
  // A future host estimator must win over our retained compatibility mirror.
  const ctx = { get: () => ({
    measure() { throw new Error('unavailable') },
    estimateMessage() { return 37 },
  }) }
  assert.equal(shadowedTokensViaMeter(session, [seq], ctx), 37)
})

test('routed pressure stays separate from fixed claims and old single-price meters', () => {
  const { session, seq } = fixture()
  const fixed = estimateMessage(deriveEventMessage(session.eventAt(seq))!)
  const routed = { get: () => ({ measure: () => ({ nodes: [{ seq, tokens: fixed + 1000, heuristicTokens: fixed }] }) }) }
  assert.equal(shadowedTokensViaMeter(session, [seq], routed), fixed)
  assert.equal(mediaPriceViaMeter(session, routed).get(seq), 1000)
  const legacy = { get: () => ({ measure: () => ({ nodes: [{ seq, tokens: fixed }] }) }) }
  assert.equal(shadowedTokensViaMeter(session, [seq], legacy), fixed)
})

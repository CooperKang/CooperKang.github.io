// GoatCounter API에서 주소별 방문자 수를 받아 data/visits.json으로 남긴다. GitHub Actions가 1시간마다 돌린다.
// 숫자가 그대로면 파일을 건드리지 않아 커밋이 생기지 않는다.
// 사용: GOATCOUNTER_TOKEN=... node scripts/visits.mjs
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const SITE = 'https://jaehakang.goatcounter.com'
const START = '2026-10-21T00:00:00Z' // 집계를 붙인 날
const OUT = new URL('../data/visits.json', import.meta.url)
const token = process.env.GOATCOUNTER_TOKEN
if (!token) throw new Error('GOATCOUNTER_TOKEN이 없어요')

const end = new Date()
end.setUTCMinutes(0, 0, 0)
end.setUTCHours(end.getUTCHours() + 1) // 지금 시각까지 포함되게 다음 정각으로
const url = `${SITE}/api/v0/stats/hits?start=${START}&end=${end.toISOString().replace('.000', '')}&limit=100`
const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } })
if (!res.ok) throw new Error(`GoatCounter ${res.status}: ${await res.text()}`)
const { hits } = await res.json()

const paths = {}
// GoatCounter는 /wedding/과 /wedding을 같은 주소로 보고 끝 /를 뗀 이름으로 준다. 혹시 둘 다 오면 합친다.
const key = (path) => path.replace(/\/+$/, '') || '/'
for (const h of hits) if (!h.event) paths[key(h.path)] = (paths[key(h.path)] ?? 0) + h.count
const sorted = Object.fromEntries(Object.entries(paths).sort(([a], [b]) => a.localeCompare(b)))

let prev = {}
try {
  prev = JSON.parse(await readFile(OUT, 'utf8')).paths ?? {}
} catch {
  // 처음 실행
}
if (JSON.stringify(prev) === JSON.stringify(sorted)) {
  console.log('변화 없음')
} else {
  await mkdir(new URL('.', OUT), { recursive: true })
  await writeFile(OUT, JSON.stringify({ at: new Date().toISOString(), paths: sorted }, null, 2) + '\n')
  console.log('갱신', sorted)
}

/**
 * 프로젝트 페이지를 PDF로 만든다. (프로젝트 페이지의 "PDF로 받기" 버튼이 이 파일을 내려받는다)
 *
 * 빌드된 정적 사이트(out/)를 잠깐 띄우고, Playwright CLI로 각 프로젝트 페이지를 인쇄 스타일
 * (css/tailwind.css 의 @media print)로 저장한다. 블로그 의존성에는 Playwright를 넣지 않고
 * npx로 고정 버전을 실행한다.
 *
 * 사용법
 *   node scripts/project-pdfs.mjs --install          # 최초 1회: Chromium 설치
 *   EXPORT=1 UNOPTIMIZED=1 yarn build                 # out/ 생성
 *   node scripts/project-pdfs.mjs                     # out/static/pdf/projects/*.pdf 생성
 *
 * 옵션
 *   --site <dir>        정적 사이트 폴더 (기본: out)
 *   --out <dir>         PDF 저장 폴더 (기본: <site>/static/pdf/projects)
 *   --url <url>         이미 떠 있는 서버 사용 (예: http://localhost:3232, yarn dev 확인용)
 *   --include-drafts    draft: true 인 프로젝트도 만든다 (--url 과 함께 로컬 확인용)
 *   --install           Chromium 설치 (CI에서는 --install --with-deps)
 *
 * 환경 변수 BASE_PATH 는 next.config.js 와 같은 의미 (GitHub Pages 하위 경로)
 */
import { spawnSync } from 'node:child_process'
import { createServer } from 'node:http'
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'

const PLAYWRIGHT = 'playwright@1.64.1'

const args = process.argv.slice(2)
const flag = (name) => args.includes(name)
const option = (name, fallback) => {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : fallback
}

const npx = (playwrightArgs) =>
  spawnSync('npx', ['-y', PLAYWRIGHT, ...playwrightArgs], { stdio: 'inherit' }).status

if (flag('--install')) {
  const extra = flag('--with-deps') ? ['--with-deps'] : []
  process.exit(npx(['install', ...extra, 'chromium']))
}

const basePath = process.env.BASE_PATH || ''
const siteDir = resolve(option('--site', 'out'))
const outDir = resolve(option('--out', join(siteDir, 'static/pdf/projects')))
const externalUrl = option('--url')
const includeDrafts = flag('--include-drafts')

const projects = JSON.parse(
  readFileSync('.contentlayer/generated/Project/_index.json', 'utf8')
).filter((p) => includeDrafts || p.draft !== true)

mkdirSync(outDir, { recursive: true })

if (projects.length === 0) {
  console.log('[project-pdfs] 공개된 프로젝트가 없어 PDF를 만들지 않습니다.')
  process.exit(0)
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
}

// GitHub Pages 처럼 /a → a.html, /a/ → a/index.html 로 찾아주는 정적 서버
function startStaticServer() {
  const isFile = (p) => existsSync(p) && statSync(p).isFile()
  const server = createServer((req, res) => {
    let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    if (basePath && urlPath.startsWith(basePath)) urlPath = urlPath.slice(basePath.length)
    const base = join(siteDir, urlPath)
    if (!base.startsWith(siteDir)) {
      res.writeHead(403).end()
      return
    }
    const file = [base, `${base}.html`, join(base, 'index.html')].find(isFile)
    if (!file) {
      res.writeHead(404).end()
      return
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' })
    createReadStream(file).pipe(res)
  })
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok(server)))
}

let server
let origin = externalUrl?.replace(/\/$/, '')
if (!origin) {
  if (!existsSync(siteDir)) {
    console.error(`[project-pdfs] ${siteDir} 가 없습니다. 먼저 EXPORT=1 yarn build 를 실행하세요.`)
    process.exit(1)
  }
  server = await startStaticServer()
  origin = `http://127.0.0.1:${server.address().port}${basePath}`
}

let failed = 0
for (const project of projects) {
  const url = `${origin}/${project.path}`
  const file = join(outDir, `${project.slug}.pdf`)
  console.log(`[project-pdfs] ${url} → ${file}`)
  const status = npx([
    'pdf',
    '--paper-format',
    'A4',
    '--color-scheme',
    'light',
    '--wait-for-selector',
    'article',
    // 웹폰트·이미지 로딩 대기
    '--wait-for-timeout',
    '1500',
    url,
    file,
  ])
  if (status !== 0) failed++
}

server?.close()
if (failed > 0) {
  console.error(`[project-pdfs] ${failed}개 실패`)
  process.exit(1)
}
console.log(`[project-pdfs] ${projects.length}개 완료`)

import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const outputDirectory = path.join(process.cwd(), '.next', 'server', 'app')
const verificationTag = "<meta name='impact-site-verification' value='7a3491ac-fb9c-427e-a0ab-1cdbed824e88'>"
const existingVerificationTag = /<meta\s+name=(['"])impact-site-verification\1[^>]*>/gi

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) return findHtmlFiles(entryPath)
    return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : []
  }))

  return files.flat()
}

const htmlFiles = await findHtmlFiles(outputDirectory)
let updatedFiles = 0

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, 'utf8')
  if (!html.includes('<head>')) continue

  const withoutExistingTag = html.replace(existingVerificationTag, '')
  const updatedHtml = withoutExistingTag.replace('<head>', `<head>${verificationTag}`)
  const headMarkup = updatedHtml.match(/<head>([\s\S]*?)<\/head>/)?.[1]
  const firstMetaTag = headMarkup?.match(/<meta\b[^>]*>/i)?.[0]

  if (firstMetaTag !== verificationTag) {
    throw new Error(`impact.com verification tag is not the first meta tag in ${htmlFile}`)
  }

  await writeFile(htmlFile, updatedHtml, 'utf8')
  updatedFiles += 1
}

if (updatedFiles === 0) {
  throw new Error('No prerendered HTML files were updated with the impact.com verification tag')
}

console.log(`Verified impact.com ownership tag order in ${updatedFiles} prerendered HTML files.`)

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('KHOTWATI Frontend Quality & Security Tests', () => {
  const rootDir = process.cwd();

  test('PWA manifest exists and contains required fields', () => {
    const manifestPath = path.join(rootDir, 'public/manifest.json');
    assert.ok(fs.existsSync(manifestPath), 'manifest.json must exist');

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    assert.strictEqual(manifest.short_name, 'KHOTWATI');
    assert.strictEqual(manifest.display, 'standalone');
    assert.strictEqual(manifest.start_url, './');
    assert.ok(manifest.icons && manifest.icons.length >= 2, 'manifest must define icons');
  });

  test('Service worker exists and handles offline caching', () => {
    const swPath = path.join(rootDir, 'public/sw.js');
    assert.ok(fs.existsSync(swPath), 'sw.js must exist');

    const swContent = fs.readFileSync(swPath, 'utf-8');
    assert.ok(swContent.includes('addEventListener(\'fetch\''), 'Service worker must intercept fetch events');
    assert.ok(swContent.includes('caches.match'), 'Service worker must support cache-first / fallback');
  });

  test('Production distribution is built with relative base paths for GitHub Pages', () => {
    const distIndexPath = path.join(rootDir, 'dist/index.html');
    assert.ok(fs.existsSync(distIndexPath), 'dist/index.html must exist after build');

    const html = fs.readFileSync(distIndexPath, 'utf-8');
    assert.ok(html.includes('KHOTWATI'), 'HTML title must mention KHOTWATI');
    assert.ok(html.includes('dir="rtl"'), 'Default direction must be RTL for Arabic');
  });

  test('Zero Supabase Dependency Verification', () => {
    const pkgJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
    const allDeps = {
      ...(pkgJson.dependencies || {}),
      ...(pkgJson.devDependencies || {})
    };

    for (const depName of Object.keys(allDeps)) {
      assert.ok(
        !depName.toLowerCase().includes('supabase'),
        `Forbidden dependency detected: ${depName}. Supabase must be completely removed.`
      );
    }
  });

  test('No GitHub Personal Access Token or Secrets in Frontend Source', () => {
    const srcDir = path.join(rootDir, 'src');
    const files = fs.readdirSync(srcDir, { recursive: true });

    for (const file of files) {
      const fullPath = path.join(srcDir, file);
      if (fs.statSync(fullPath).isFile()) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        assert.ok(!content.includes('ghp_'), `Potential GitHub Personal Access Token in ${file}`);
        assert.ok(!content.includes('github_pat_'), `Potential GitHub Personal Access Token in ${file}`);
      }
    }
  });
});

// scripts/scaffold.ts
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = resolve(__dirname, '..');
const structure: string[] = [
  'src/app/components/SettingsPanel.tsx',
  'src/app/components/PluginManager.tsx',
  'src/app/components/Diagnostics.tsx',
  'src/app/components/ThemeSwitcher.tsx',
  'src/app/components/AutoUpdateBanner.tsx',
  'src/app/pages/Home.tsx',
  'src/app/pages/Settings.tsx',
  'src/app/pages/Plugins.tsx',
  'src/app/layouts/MainLayout.tsx',
  'src/app/layouts/DashboardLayout.tsx',
  'src/app/hooks/useSettings.ts',
  'src/app/hooks/usePlugins.ts',
  'src/app/hooks/useDiagnostics.ts',
  'src/app/providers/ThemeProvider.tsx',
  'src/app/providers/PluginProvider.tsx',
  'src/app/utils/api.ts',
  'src/app/utils/config.ts',
  'src/app/utils/helpers.ts',
  'src/core/api/settings.ts',
  'src/core/api/analytics.ts',
  'src/core/api/plugins.ts',
  'src/core/state/store.ts',
  'src/core/state/reducers.ts',
  'src/core/utils/logger.ts',
  'src/core/utils/helpers.ts',
  'src/styles/themes.css',
  'src/styles/global.css',
  'src/styles/neon.css',
  'src/main.tsx',
  'public/favicon.ico',
  'public/robots.txt',
  'public/index.html',
  'src-tauri/src/main.rs',
  'src-tauri/src/commands/settings.rs',
  'src-tauri/src/commands/analytics.rs',
  'src-tauri/src/commands/plugins.rs',
  'src-tauri/src/commands/diagnostics.rs',
  'src-tauri/src/commands/update.rs',
  'src-tauri/src/plugins/sample_plugin.rs',
  'src-tauri/src/plugins/registry.rs',
  'src-tauri/src/domain/config.rs',
  'src-tauri/src/domain/models.rs',
  'src-tauri/src/domain/update.rs',
  'src-tauri/src/domain/diagnostics.rs',
  'src-tauri/src/utils/logger.rs',
  'src-tauri/src/utils/helpers.rs',
  'src-tauri/tauri.conf.json',
  'src-tauri/Cargo.toml',
  'src-tauri/build.rs',
  'plugins/example-plugin/src/main.rs',
  'plugins/example-plugin/src/lib.rs',
  'plugins/example-plugin/Cargo.toml',
  'plugins/example-plugin/plugin.json',
  'scripts/generate-downloads-manifest.ts',
  'scripts/build-plugins.ts',
  '.github/workflows/release.yml',
  '.github/workflows/build.yml',
  '.github/workflows/test.yml',
  '.gitignore',
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'README.md'
];

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function ensureFile(file: string): void {
  const dir = dirname(file);
  ensureDir(dir);
  if (!existsSync(file)) {
    writeFileSync(file, '', 'utf-8');
  }
}

function scaffold(): void {
  structure.forEach(file => {
    const fullPath = join(projectRoot, file);
    ensureFile(fullPath);
  });
  console.log('Scaffold complete!');
}

scaffold();

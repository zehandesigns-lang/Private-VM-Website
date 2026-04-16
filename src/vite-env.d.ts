/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POWER_AUTOMATE_DEMO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

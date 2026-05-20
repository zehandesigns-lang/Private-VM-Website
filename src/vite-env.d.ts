/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WAYSHIP_TIMELINE_VIDEO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

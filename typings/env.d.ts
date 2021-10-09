// typings/env.d.ts
interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_MODE_NAME: string
    readonly VITE_APP_ID: string
    readonly VITE_AGENT_ID: string
    readonly VITE_LOGIN_TEST: string
    readonly VITE_RES_URL: string
    readonly VITE_BASE_URL: string
    readonly VITE_APP_TITLE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

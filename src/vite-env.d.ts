/// <reference types="vite/client" />

interface IAppImportMetaEnv {
  readonly VITE_APP_NODE_ENV: string;
  readonly VITE_APP_PUBLIC_URL: string;
  readonly VITE_APP_BACK_END_POINT: string;
  readonly VITE_APP_PHONE_NUMBER: string;
  readonly VITE_APP_EMAIL: string;
  readonly VITE_APP_GITHUB: string;
  readonly VITE_APP_PORTFOLIO: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface IAppImportMeta {
  readonly env: IAppImportMetaEnv;
}

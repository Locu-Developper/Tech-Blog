interface ImportMetaEnv {
    readonly SITE: string;
    readonly CONTENTFUL_SPACE_ID: string;
    readonly CONTENTFUL_DELIVERY_TOKEN: string;
    readonly CONTENTFUL_PREVIEW_TOKEN: string;
    readonly NOTION_SECRET_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
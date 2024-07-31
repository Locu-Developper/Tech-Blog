import type {TextRequest} from "notion-to-md/build/types";

/**
 * @params id: ページID
 * @params slug: スラッグ(記事パス名)
 * @params title: ページタイトル
 * @params createdAt: 作成日
 * @params updatedAt: 更新日
 * @params icon: アイコン
 * @params category: {
 *     id: カテゴリID
 *     name: カテゴリ名
 * }
 * @params tags: [{
 *     id: タグID
 *     name: タグ名
 *     color: タグ色
 * }]
 */
export interface IPageProperty {
    id: string;
    slug: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    icon: { type: "emoji"; emoji: string } | { type: "external"; external: { url: string } } | {
        type: "file";
        file: { url: string; expiry_time: string }
    } | null;
    category: {
        id: string;
        name: string;
    };
    tags: {
        id: string;
        name: string;
        color: string;
    }[]
}

export interface IPageContent {
    property: IPageProperty;
    content: string;
}

export class PageProperty implements IPageProperty{


    id: string;
    slug: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    icon: { type: "emoji"; emoji: string } | { type: "external"; external: { url: TextRequest } } | {
        type: "file";
        file: { url: string; expiry_time: string }
    } | null;
    category: {
        id: string;
        name: string;
    };
    tags: {
        id: string;
        name: string;
        color: string;
    }[];

    /**
     * @constructor
     * @param pageId
     * @param slug
     * @param title
     * @param createdAt
     * @param updatedAt
     * @param icon
     * @param category
     * @param tags
     */
    constructor(
        pageId: string,
        slug: string,
        title: string,
        createdAt: string,
        updatedAt: string,
        icon: { type: "emoji"; emoji: string } | { type: "external"; external: { url: TextRequest } } | {
            type: "file";
            file: { url: string; expiry_time: string }
        } | null,
        category: { id: string; name: string },
        tags: { id: string; name: string; color: string }[]
    ) {
        this.id = pageId;
        this.slug = slug;
        this.title = title;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.icon = icon;
        this.category = category;
        this.tags = tags;
    }

}

export class PageContent implements IPageContent {
    property: IPageProperty;
    content: string;

    constructor(
        property: IPageProperty,
        content: string
    ) {
        this.property = property;
        this.content = content;
    }
}
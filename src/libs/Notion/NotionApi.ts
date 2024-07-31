import notionApi from '@notionhq/client'
import {type IPageContent, type IPageProperty, PageContent, PageProperty} from './PageProperty.ts';
import {NotionToMarkdown} from "notion-to-md";

const notion = new notionApi.Client({
    auth: import.meta.env.NOTION_SECRET_ID
});
const n2m = new NotionToMarkdown({notionClient: notion});
const databaseId = import.meta.env.NOTION_DATABASE_ID;
const propertyName = ["All", "Tag", "Category", "Slug"]

/**
 * getQueryPostメソッドで使用
 */
export const postQueryProperty = Object.freeze({
    All: propertyName[0],
    Tag: propertyName[1],
    Category: propertyName[2],
    Slug: propertyName[3]
})

/**
 * Notionデータベースからページ一覧を取得
 * @params property - postQueryPropertyから選択
 * @params query - 任意 { All:指定なし(指定しても無視をする) Tag:タグ名 Category:カテゴリ名 }
 */
export const getPostProperty = async(property = postQueryProperty.Tag, query = '') => {
    let json = ''
    switch(property){
        case propertyName[0]:
            json = `{ "database_id": "${databaseId}" }`
            break;
        case propertyName[1]:
            if(query === ''){return []}
            json = `{
                        "database_id": "${databaseId}",
                        "filter": {
                            "property": "タグ",
                            "multi_select": {
                                "contains": "${query}"
                            }
                        }
                    }`
            break
        case propertyName[2]:
            if(query === ''){return []}
            json = `{
                        "database_id": "${databaseId}",
                        "filter": {
                            "property": "カテゴリ",
                            "select": {
                                "equals": "${query}"
                            }
                        }
                    }`
            break
        case propertyName[3]:
            if(query === ''){return []}
            json = `{
                        "database_id": "${databaseId}",
                        "filter": {
                            "property": "スラッグ",
                            "select": {
                                "contains": "${query}"
                            }
                        }
                    }`
            break
    }

    if(json === ''){ return [] }
    return await getQueryRequestPages(json);
}


/**
 * データベースから必要項目をPagePropertyに保持し配列で取得
 * @return {PageProperty[]}
 * @params json: クエリJSON
 */
async function getQueryRequestPages(json: string): Promise<PageProperty[]>{
    let pages: IPageProperty[] = [];
    const response = await notion.databases.query(JSON.parse(json));
    //プロパティ情報
    try{
        response.results.map(res => {
            // console.log(res)
            if(!notionApi.isFullPageOrDatabase(res)){ throw Error('ページ取得中にページ以外のデータを取得しました')}
            // console.log(res.properties['タグ'])
            pages.push(new PageProperty(
                res.id,
                res.properties['スラッグ'].rich_text[0].text.content,
                res.properties['名前'].title[0].text.content,
                res.created_time,
                res.last_edited_time,
                res.icon,
                res.properties['カテゴリ'].select,
                res.properties['タグ'].multi_select,
            ));
        })
    }catch(e){
        console.error(e)
    }

    return pages;
}

/**
 *
 */
export const getPage = async (): Promise<PageContent[]> => {
    let pages: IPageContent[] = [];

    try{
        const prop = await getPostProperty(postQueryProperty.All);
        for (const p of prop) {

            await (async () => {
                const mdBlocks = await n2m.pageToMarkdown(p.id);
                const mdString = n2m.toMarkdownString(mdBlocks);
                // console.log(p)
                pages.push(new PageContent(p, mdString.parent));
            })();
        }
    }catch(e){
        console.error(e)
    }


    return pages;
}



import type {TextRequest} from "notion-to-md/build/types";

const classByType = ["w-1/2 rounded m-auto rounded", "w-[30%] lg:w-[10%] m-auto mb-2"];

/**
 * アイコン種類判別用メソッド
 * @params icon
 * @params type : 0: カード用 1: 記事アイコン用
 */
export const iconJudge = (
    icon: { type: "emoji"; emoji: string } | { type: "external"; external: { url: TextRequest } } | {
        type: "file";
        file: { url: string; expiry_time: string }
    }| null, type: number) => {

    if (icon === null) {
        return
    }

    switch (icon.type){
        case 'emoji':
            return icon.emoji.toString();
        case 'file':
            return `<img src=${icon.file.url} alt="icon" class="${classByType[type]}">`;
        case 'external':
            return `<img src=${icon.external.url} alt="icon" class="${classByType[type]}">`;
        default:
            return '<i class="fa-solid fa-xmark" style="color: #ff2e2e;"></i>';
    }

}

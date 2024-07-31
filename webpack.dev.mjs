import path from 'path';
import { fileURLToPath } from 'url';
import {fileName, list} from "./webpack.common.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default {
    mode: "development",
    entry: list,
    output: {
        filename: fileName,
        path: path.resolve(__dirname, 'src/pages')
    }
}
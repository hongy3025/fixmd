import * as fs from 'fs';
import * as path from 'path';
import * as TurndownService from 'turndown';

const tables = require('./turndown-plugin-gfm/tables');


function NewTurndownService() {
    const turndownService = new TurndownService();
    turndownService.use([tables]);
    return turndownService;
}

const turndownService = NewTurndownService();

function WalkSync(dir: string, callback: (filePath: string) => void) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            WalkSync(fullPath, callback);
        } else {
            callback(fullPath);
        }
    }
}

class Converter {
    public readonly inputDir: string;
    public readonly outputDir: string;

    static readonly RE_table = /<table>.*?<\/table>\n/gims;


    public constructor (inputDir: string, outputDir: string) {
        this.inputDir = inputDir;
        this.outputDir = outputDir;
    }

    public Convert() {
        const rootDir = this.inputDir;
        WalkSync(rootDir, (filePath) => {
            const relFilePath = path.relative(rootDir, filePath).replace('\\', '/');
            const outputFilePath = path.join(this.outputDir, relFilePath);
            const outputDir = path.dirname(outputFilePath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            const inputFilePath = path.join(rootDir, relFilePath);

            console.log(`convert ${relFilePath}`);

            if (relFilePath.endsWith('.md')) {
                this.ConvertMarkdown(inputFilePath, outputFilePath);
            } else {
                fs.copyFileSync(inputFilePath, outputFilePath);
            }
        });
    }

    private ConvertMarkdown(srcFile: string, dstFile: string) {
        const fromContent = fs.readFileSync(srcFile, 'utf8');
        const toContent = fromContent.replace(Converter.RE_table, (html) => {
            const md = turndownService.turndown(html) + '\n';
            return md;
        });
        fs.writeFileSync(dstFile, toContent);
    }

}

function Main() {
    const inputDir = 'D:/txcombo/github/ConvertOneNote2MarkDown/working/inputs/';
    const outputDir = 'D:/txcombo/github/ConvertOneNote2MarkDown/working/outputs/';
    const c = new Converter(inputDir, outputDir);
    c.Convert();

}


Main();

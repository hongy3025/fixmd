import * as TurndownService from 'turndown';

function NewTurndownService() {
    const turndownPluginGfm = require('turndown-plugin-gfm');
    const gfm = turndownPluginGfm.gfm;
    const tables = turndownPluginGfm.tables;
    const strikethrough = turndownPluginGfm.strikethrough;

    const turndownService = new TurndownService();
    turndownService.use(gfm);
    turndownService.use([gfm, tables, strikethrough]);
    turndownService.addRule('p', {
        filter: ['p'],
        replacement: (content) => {
            return content + '<br>';
        }
    });
    return turndownService;
}

const turndownService = NewTurndownService();

const s = `
<table>
<colgroup>
<col style="width: 10%" />
<col style="width: 13%" />
<col style="width: 45%" />
<col style="width: 30%" />
</colgroup>
<thead>
<tr>
<th>起始时间</th>
<th>结束时间</th>
<th>任务</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>2月18日</td>
<td>2月26日</td>
<td>熟悉城主项目，所用的前后端引擎、项目工程环境；了解大致的开发流程、所用到的开发工具、日常开发编码习惯。</td>
<td> </td>
</tr>
<tr>
<td>3月1日</td>
<td>3月12日</td>
<td>为城主项目重构客户端资源打包脚本工具，重构资源热更（patch）机制；</td>
<td>和陈栋初步达成意向，开工前要进一步确认评估；</td>
</tr>
<tr>
<td>3月15日</td>
<td>3月26日</td>
<td><p>构建基于Jenkins的自动打包平台。</p>
<p>达成协助自动快速打出真机体验包。每周版本自动打包。</p></td>
<td><p>svn提交触发自动打包；</p>
<p>app母包增量打包，每次打包时间控制在：2~5分钟。</p>
<p>资源包增量打包，每次打包时间控制在：2~10分钟。</p>
<p>就是说：svn提交代码或资源后，最晚10分钟内，可以下载到真机体验包。</p></td>
</tr>
</tbody>
</table>
`;

function Main() {
    const markdown = turndownService.turndown(s);
    console.log(markdown);
}

Main();
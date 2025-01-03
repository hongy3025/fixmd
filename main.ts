import * as TurndownService from 'turndown';
const tables = require('./turndown-plugin-gfm/tables');


function NewTurndownService() {
    const turndownService = new TurndownService();
    turndownService.use([tables]);
    return turndownService;
}

const turndownService = NewTurndownService();

function Main() {
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

    const markdown = turndownService.turndown(s);
    console.log(markdown);
}


function T2() {
    const s = `

寻路

寻路到NPC、采集物、触发点，表现优化

<table>
<colgroup>
<col style="width: 0%" />
<col style="width: 99%" />
</colgroup>
<thead>
<tr>
<th></th>
<th><table>
<colgroup>
<col style="width: 74%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr>
<th>客户端寻路路径优化</th>
<th>探春</th>
</tr>
</thead>
<tbody>
</tbody>
</table></th>
</tr>
</thead>
<tbody>
</tbody>
</table>



镜头

镜头跟随转向体验优化





走路

<table>
<colgroup>
<col style="width: 89%" />
<col style="width: 10%" />
</colgroup>
<thead>
<tr>
<th><blockquote>
<p>客户端移动表现平滑度优化</p>
<p>服务端需要给move和战斗协议每个消息新增一个序列号字段</p>
</blockquote></th>
<th>探春<br />
洪颖</th>
</tr>
</thead>
<tbody>
<tr>
<td><blockquote>
<p>走路交地表平滑优化</p>
</blockquote></td>
<td>探春</td>
</tr>
<tr>
<td><blockquote>
<p>自动寻路转向的时候，做平滑过渡</p>
</blockquote></td>
<td>洪颖</td>
</tr>
</tbody>
</table>

EEE
    `;
    //
    const re = new RegExp(/<table>.*?<\/table>\n/, 'gims'); // 标志 gims 分别表示：全局匹配、忽略大小写、多行模式和点号匹配换行符。
    const res = s.replace(re, (html) => {
        const md = turndownService.turndown(html) + '\n';
        return md;
    });
    console.log(res);
}

T2();
const path = require('path');
const fs = require('fs-extra');

module.exports = async function listpage(ctx) {
    const { url, name, pageOption } = ctx.request.body;
    const { formCode } = pageOption;
    const base = path.join(process.cwd(), url, name, 'map.js');
    const mapString = `
${formCode}
`;
    try {
        fs.outputFileSync(base, mapString);
        ctx.success(200, '创建成功', null);
    } catch {
        ctx.success(0, '创建失败', null);
    }
};
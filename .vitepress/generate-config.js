const fs = require('fs');
const path = require('path');

// 定义 docs 目录路径
const docsDir = path.join(__dirname, '../docs');

// 生成侧边栏配置
function generateSidebarConfig() {
    const sidebar = {};
    const topLevelDirs = fs.readdirSync(docsDir, { withFileTypes: true });

    topLevelDirs.forEach(dirent => {

        if (dirent.isDirectory()) {
            const dirName = dirent.name;
            if(dirName !== 'public'){
                const subDirs = fs.readdirSync(path.join(docsDir, dirName), { withFileTypes: true });
                subDirs.forEach(subDirent => {
                    if (subDirent.isDirectory()) {
                        const subDirName = subDirent.name;
                        const sidebarPath = `/${dirName}/${subDirName}`;
                        const sidebarItems = [];

                        const files = fs.readdirSync(path.join(docsDir, dirName, subDirName));
                        files.sort((a, b) => {
                            const numA = parseInt(a.match(/\d+/) || 0);
                            const numB = parseInt(b.match(/\d+/) || 0);
                            return numA - numB;
                        });
                        files.forEach(file => {
                            if (path.extname(file) === '.md') {
                                const fileName = path.parse(file).name;
                                sidebarItems.push({
                                    text: fileName,
                                    link: `${sidebarPath}/${fileName}`
                                });
                            }
                        });

                        sidebar[sidebarPath] = [
                            {
                                text: subDirName,
                                items: sidebarItems
                            }
                        ];
                    }
                });
            }

        }
    });

    return sidebar;
}

// 生成 sidebar.mts 文件
function writeSidebarConfig(sidebar) {
    const sidebarContent = `export default ${JSON.stringify(sidebar, null, 2)};`;
    fs.writeFileSync(path.join(__dirname, 'sidebar.mts'), sidebarContent);
    console.log('sidebar.mts 文件生成成功');
}

// 执行生成操作
const sidebar = generateSidebarConfig();
writeSidebarConfig(sidebar);

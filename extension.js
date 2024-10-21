const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.generateFileTree', function (uri) {
    const rootPath = uri.fsPath;

    // 显示输入框以获取用户的文件名输入
    vscode.window.showInputBox({
      prompt: '请输入文件名',
      placeHolder: '请输入Markdown目录文件的名称'
    }).then(fileName => {
      if (!fileName) {
        vscode.window.showErrorMessage('文件名不能为空');
        return;
      }

      // 添加 .md 后缀
      let outputFileName = `${fileName}.md`;
      let outputFilePath = path.join(rootPath, outputFileName);

      // 如果文件已存在，添加数字后缀避免重名
      let counter = 1;
      while (fs.existsSync(outputFilePath)) {
        outputFileName = `${fileName}_${counter}.md`;
        outputFilePath = path.join(rootPath, outputFileName);
        counter++;
      }

      // 递归生成文件树
      function generateFileTree(dirPath, baseUrl = '') {
        let fileTree = '';
        const items = fs.readdirSync(dirPath);

        items.forEach(item => {
          const itemPath = path.join(dirPath, item);
          const stat = fs.statSync(itemPath);

          if (stat.isDirectory()) {
            // 对于文件夹，使用文件夹名称
            fileTree += `## ${item}\n`;
            fileTree += generateFileTree(itemPath, path.join(baseUrl, item));
          } else if (item.endsWith('.md')) {
            // 只处理 .md 文件
            let displayName = item;  // 默认文件名
            const fileLink = path.join(baseUrl, item).replace(/\\/g, '/'); // Windows 兼容性

            // 读取文件内容并提取 YAML front matter 的 title
            const fileContent = fs.readFileSync(itemPath, 'utf8');
            const yamlFrontMatterMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);

            if (yamlFrontMatterMatch) {
              try {
                const frontMatter = yaml.load(yamlFrontMatterMatch[1]);

                // 如果找到 title 字段，则使用 title 作为文件名
                if (frontMatter && frontMatter.title) {
                  displayName = frontMatter.title;
                }
              } catch (e) {
                console.error(`Error parsing YAML front matter in ${item}:`, e);
              }
            }

            // 添加文件名或 title 和文件链接
            fileTree += `  - [${displayName}](${fileLink})\n`;
          }
        });
        return fileTree;
      }

      // 生成文件树内容
      const fileTree = generateFileTree(rootPath);

      // 创建 YAML front matter
      const frontMatter = `---\ntitle: ${fileName}\npublish: false\n---\n\n`;

      // 将 front matter 和文件树合并
      const fullContent = frontMatter + fileTree;

      // 写入文件
      fs.writeFileSync(outputFilePath, fullContent);
      vscode.window.showInformationMessage('文件目录已生成: ' + outputFilePath);
    });
  });

  context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() { }

module.exports = {
  activate,
  deactivate
};

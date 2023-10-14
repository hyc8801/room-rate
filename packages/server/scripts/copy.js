const fs = require('fs');
const path = require('path');

function copyDirectory(source, destination) {
  // 创建目标目录
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  // 读取源目录下的所有文件和文件夹
  const files = fs.readdirSync(source, { withFileTypes: true });

  // 遍历文件和文件夹
  files.forEach((file) => {
    const sourcePath = path.join(source, file.name);
    const destinationPath = path.join(destination, file.name);

    // 如果是文件夹，则递归复制
    if (file.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      // 如果是文件，则复制文件
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}
// 获取当前执行脚本的绝对路径
const cwd = process.cwd();
const sourceDir = path.join(cwd, 'dist');
const targetDir = path.join(cwd, 'build');

// 将当前执行环境下的 /dist 目录下的文件和文件夹复制到 /build 目录下
copyDirectory(sourceDir, targetDir);

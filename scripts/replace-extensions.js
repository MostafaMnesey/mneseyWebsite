const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function getHtmlFiles(dir, allFiles = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getHtmlFiles(name, allFiles);
    } else {
      if (file.endsWith('.html')) {
        allFiles.push(name);
      }
    }
  });
  return allFiles;
}

function replaceExtensions() {
  console.log('🔄 Starting mass replacement of image extensions to .webp...');
  const htmlFiles = getHtmlFiles(srcDir);
  let count = 0;

  htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Replace .jpg, .jpeg, .png with .webp inside src, srcset, etc.
    // We use a regex that looks for common image extensions not followed by .svg or already .webp
    content = content.replace(/\.(jpe?g|png)(?=["'])/gi, '.webp');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated: ${path.relative(srcDir, filePath)}`);
      count++;
    }
  });

  console.log(`\n✨ Done! Updated ${count} HTML files.`);
}

replaceExtensions();

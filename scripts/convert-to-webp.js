const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../public');

// Function to recursively get files
function getFiles(dir, allFiles = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, allFiles);
    } else {
      if (/\.(jpe?g|png)$/i.test(file)) {
        allFiles.push(name);
      }
    }
  });
  return allFiles;
}

async function convertImages() {
  console.log('🚀 Starting WebP conversion...');
  const images = getFiles(targetDir);
  let totalSaved = 0;

  for (const imagePath of images) {
    const ext = path.extname(imagePath);
    const webpPath = imagePath.replace(ext, '.webp');

    try {
      const stats = fs.statSync(imagePath);
      const originalSize = stats.size;

      await sharp(imagePath)
        .webp({ quality: 80 })
        .toFile(webpPath);

      const newStats = fs.statSync(webpPath);
      const newSize = newStats.size;
      const saved = originalSize - newSize;
      totalSaved += saved;

      console.log(`✅ Converted: ${path.basename(imagePath)} (${(saved / 1024).toFixed(2)} KB saved)`);
    } catch (err) {
      console.error(`❌ Error converting ${imagePath}:`, err.message);
    }
  }

  console.log('\n✨ Conversion Complete!');
  console.log(`📊 Total space saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
  console.log('📝 Note: The original files were kept. You can now update your code to use .webp extensions.');
}

convertImages();

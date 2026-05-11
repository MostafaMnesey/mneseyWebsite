#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  inputDir: 'public/images',
  brandingDir: 'public/branding',
  outputDir: 'public/optimized',
  logoOutputDir: 'public/optimized/logos',
  sizes: {
    logo: [100, 150, 200, 250, 300, 400],
    thumbnail: [50, 100, 150, 200],
    hero: [400, 600, 800, 1200, 1600],
    general: [200, 400, 600, 800]
  },
  quality: {
    webp: 80,
    jpeg: 85,
    png: 90
  },
  formats: ['webp', 'jpeg', 'png']
};

// Logo files to optimize
const logoFiles = [
  'logo.png',
  'logo-white.png',
  'Group 3287.png',
  'image001.png.png',
  'image003.jpg.png',
  'SAMS-Logo-sm.jpeg.png'
];

// Utility functions
const ensureDir = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
};

const getFileExtension = (filename) => {
  return path.extname(filename).toLowerCase();
};

const isImageFile = (filename) => {
  const ext = getFileExtension(filename);
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext);
};

const getBaseName = (filename) => {
  return path.basename(filename, path.extname(filename));
};

const optimizeImage = async (inputPath, outputPath, options = {}) => {
  try {
    const {
      width,
      height,
      format = 'webp',
      quality = config.quality[format] || 80,
      fit = 'inside'
    } = options;

    let sharpInstance = sharp(inputPath);

    if (width || height) {
      sharpInstance = sharpInstance.resize(width, height, {
        fit,
        withoutEnlargement: true
      });
    }

    switch (format) {
      case 'webp':
        sharpInstance = sharpInstance.webp({ quality });
        break;
      case 'jpeg':
        sharpInstance = sharpInstance.jpeg({ quality });
        break;
      case 'png':
        sharpInstance = sharpInstance.png({ quality });
        break;
      default:
        sharpInstance = sharpInstance.webp({ quality });
    }

    await sharpInstance.toFile(outputPath);
    console.log(`✅ Optimized: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
};

const generateResponsiveImages = async (inputPath, outputDir, sizes, formats) => {
  const baseName = getBaseName(path.basename(inputPath));
  
  for (const size of sizes) {
    for (const format of formats) {
      const outputPath = path.join(outputDir, `${baseName}-${size}w.${format}`);
      await optimizeImage(inputPath, outputPath, {
        width: size,
        format,
        fit: 'inside'
      });
    }
  }
};

const optimizeLogo = async (logoFile) => {
  console.log(`\n🎨 Optimizing logo: ${logoFile}`);
  
  const inputPath = path.join(config.brandingDir, logoFile);
  const logoOutputDir = path.join(config.logoOutputDir, getBaseName(logoFile));
  
  try {
    await ensureDir(logoOutputDir);
    
    // Check if file exists
    try {
      await fs.access(inputPath);
    } catch {
      console.log(`⚠️ Logo file not found: ${inputPath}`);
      return;
    }

    // Generate different sizes and formats
    for (const size of config.sizes.logo) {
      for (const format of config.formats) {
        const outputPath = path.join(logoOutputDir, `${getBaseName(logoFile)}-${size}w.${format}`);
        await optimizeImage(inputPath, outputPath, {
          width: size,
          format,
          fit: 'inside'
        });
      }
    }

    // Generate srcset string
    const srcset = config.sizes.logo.map(size => {
      return config.formats.map(format => {
        return `${path.join(logoOutputDir, `${getBaseName(logoFile)}-${size}w.${format}`)} ${size}w`;
      }).join(', ');
    }).join(', ');

    console.log(`📝 Srcset for ${logoFile}:`);
    console.log(srcset);
    
  } catch (error) {
    console.error(`❌ Error optimizing logo ${logoFile}:`, error.message);
  }
};

const optimizeDirectory = async (inputDir, outputDir, sizes = config.sizes.general) => {
  console.log(`\n📁 Optimizing directory: ${inputDir}`);
  
  try {
    await ensureDir(outputDir);
    
    const files = await fs.readdir(inputDir);
    const imageFiles = files.filter(isImageFile);
    
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const baseName = getBaseName(file);
      const fileOutputDir = path.join(outputDir, baseName);
      
      await ensureDir(fileOutputDir);
      
      console.log(`🖼️ Processing: ${file}`);
      
      // Generate responsive images
      await generateResponsiveImages(inputPath, fileOutputDir, sizes, config.formats);
      
      // Generate original size optimized version
      for (const format of config.formats) {
        const outputPath = path.join(fileOutputDir, `${baseName}.${format}`);
        await optimizeImage(inputPath, outputPath, { format });
      }
    }
  } catch (error) {
    console.error(`❌ Error optimizing directory ${inputDir}:`, error.message);
  }
};

const createImageComponent = async () => {
  const componentContent = `import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-optimized-image',
  imports: [NgOptimizedImage],
  template: \`
    <img
      [ngSrc]="imageUrl()"
      [width]="width()"
      [height]="height()"
      [alt]="alt()"
      [priority]="priority()"
      [placeholder]="placeholder() ? 'blur' : undefined"
      [sizes]="sizes()"
      class="w-full h-auto"
    />
  \`,
  styles: [\`
    :host {
      display: block;
    }
  \`]
})
export class OptimizedImageComponent implements OnInit {
  url = input<string>('');
  width = input<number>(0);
  height = input<number>(0);
  alt = input<string>('');
  priority = input<boolean>(false);
  placeholder = input<boolean>(false);
  sizes = input<string>('100vw');
  format = input<'webp' | 'jpeg' | 'png'>('webp');
  quality = input<number>(80);

  imageUrl = computed(() => {
    const baseUrl = this.url();
    if (!baseUrl) return '';
    
    // If it's already an optimized image, return as is
    if (baseUrl.includes('optimized/')) {
      return baseUrl;
    }
    
    // Otherwise, construct optimized URL
    const params = new URLSearchParams({
      w: this.width().toString(),
      h: this.height().toString(),
      f: this.format(),
      q: this.quality().toString(),
      fit: 'inside'
    });
    
    return \`\${baseUrl}?\${params.toString()}\`;
  });

  ngOnInit() {
    // Component initialization
  }
}`;

  const componentPath = 'src/app/shared/optimized-image/optimized-image.component.ts';
  await ensureDir(path.dirname(componentPath));
  await fs.writeFile(componentPath, componentContent);
  console.log('✅ Created optimized image component');
};

const createPackageJsonScripts = async () => {
  const packageJsonPath = 'package.json';
  
  try {
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    
    packageJson.scripts = {
      ...packageJson.scripts,
      'optimize:images': 'node scripts/optimize-images.js',
      'optimize:logos': 'node scripts/optimize-images.js --logos-only',
      'optimize:all': 'node scripts/optimize-images.js --all'
    };
    
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Added optimization scripts to package.json');
  } catch (error) {
    console.error('❌ Error updating package.json:', error.message);
  }
};

const main = async () => {
  console.log('🚀 Starting image optimization...\n');
  
  const args = process.argv.slice(2);
  const logosOnly = args.includes('--logos-only');
  const all = args.includes('--all');
  
  try {
    // Ensure output directories exist
    await ensureDir(config.outputDir);
    await ensureDir(config.logoOutputDir);
    
    if (logosOnly || all) {
      // Optimize logos
      console.log('🎨 Optimizing logos...');
      for (const logoFile of logoFiles) {
        await optimizeLogo(logoFile);
      }
    }
    
    if (!logosOnly || all) {
      // Optimize general images
      await optimizeDirectory(config.inputDir, config.outputDir);
    }
    
    // Create optimized image component
    await createImageComponent();
    
    // Update package.json scripts
    await createPackageJsonScripts();
    
    console.log('\n🎉 Image optimization completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Update your components to use the optimized images');
    console.log('2. Use the new OptimizedImageComponent for better performance');
    console.log('3. Run "npm run optimize:images" to re-optimize when needed');
    
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  }
};

// Check if Sharp is installed
try {
  require('sharp');
} catch (error) {
  console.error('❌ Sharp is not installed. Installing...');
  try {
    execSync('npm install sharp', { stdio: 'inherit' });
    console.log('✅ Sharp installed successfully');
  } catch (installError) {
    console.error('❌ Failed to install Sharp:', installError.message);
    process.exit(1);
  }
}

main(); 
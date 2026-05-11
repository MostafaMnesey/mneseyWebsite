#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Logo configuration
const logoConfig = {
  // Navbar logos
  navbar: {
    'logo.png': { sizes: [150, 200, 250, 300], source: 'public/branding/logo.png' },
    'logo-white.png': { sizes: [150, 200, 250, 300], source: 'public/images/logo-white.png' }
  },
  // Footer logos
  footer: {
    'Group 3287.png': { sizes: [200, 300, 400], source: 'public/images/Group 3287.png' },
    'image001.png.png': { sizes: [100, 150, 200], source: 'public/images/image001.png.png' },
    'image003.jpg.png': { sizes: [100, 150, 200], source: 'public/images/image003.jpg.png' },
    'SAMS-Logo-sm.jpeg.png': { sizes: [100, 150, 200], source: 'public/images/SAMS-Logo-sm.jpeg.png' }
  }
};

const outputDir = 'public/optimized/logos';
const quality = { webp: 85, png: 90, jpeg: 85 };

// Utility functions
const ensureDir = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
};

const getBaseName = (filename) => {
  return path.basename(filename, path.extname(filename));
};

// Sanitize a string for use in URLs and file paths (replace spaces with dashes)
const sanitize = (str) => str.replace(/\s+/g, '-');

const optimizeLogo = async (logoName, config) => {
  console.log(`\n🎨 Optimizing: ${logoName}`);
  
  const { sizes, source } = config;
  const baseName = getBaseName(logoName);
  const sanitizedBaseName = sanitize(baseName);
  const logoOutputDir = path.join(outputDir, sanitizedBaseName);
  
  try {
    await ensureDir(logoOutputDir);
    
    // Check if source file exists
    try {
      await fs.access(source);
    } catch {
      console.log(`⚠️ Source file not found: ${source}`);
      return;
    }

    const results = [];

    // Generate WebP versions (primary format)
    for (const size of sizes) {
      const outputPath = path.join(logoOutputDir, `${sanitizedBaseName}-${size}w.webp`);
      await sharp(source)
        .resize(size, null, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .webp({ quality: quality.webp })
        .toFile(outputPath);
      
      // Convert to web path (remove 'public/' prefix and use forward slashes)
      const webPath = `optimized/logos/${sanitizedBaseName}/${sanitizedBaseName}-${size}w.webp`;
      results.push(`${webPath} ${size}w`);
      console.log(`✅ Created: ${path.basename(outputPath)}`);
    }

    // Generate PNG fallback (original size)
    const pngOutputPath = path.join(logoOutputDir, `${sanitizedBaseName}.png`);
    await sharp(source)
      .png({ quality: quality.png })
      .toFile(pngOutputPath);
    
    console.log(`✅ Created: ${path.basename(pngOutputPath)}`);

    // Generate srcset for WebP
    const srcset = results.join(', ');
    console.log(`📝 WebP srcset for ${logoName}:`);
    console.log(srcset);
    
    return {
      name: logoName,
      baseName: sanitizedBaseName,
      srcset,
      pngFallback: `optimized/logos/${sanitizedBaseName}/${sanitizedBaseName}.png`,
      webpVersions: results
    };

  } catch (error) {
    console.error(`❌ Error optimizing ${logoName}:`, error.message);
    return null;
  }
};

const createLogoService = async (results) => {
  const serviceContent = `import { Injectable } from '@angular/core';

export interface LogoConfig {
  name: string;
  baseName: string;
  srcset: string;
  pngFallback: string;
  webpVersions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  private logos: Map<string, LogoConfig> = new Map();

  constructor() {
    // Initialize logo configurations with correct web paths
${results.map(result => `    this.logos.set('${result.name}', {
      name: '${result.name}',
      baseName: '${result.baseName}',
      srcset: '${result.srcset}',
      pngFallback: '${result.pngFallback}',
      webpVersions: ${JSON.stringify(result.webpVersions)}
    });`).join('\n')}
  }

  getLogo(name: string): LogoConfig | undefined {
    return this.logos.get(name);
  }

  getLogoSrcset(name: string): string {
    const logo = this.logos.get(name);
    return logo?.srcset || '';
  }

  getLogoFallback(name: string): string {
    const logo = this.logos.get(name);
    return logo?.pngFallback || '';
  }

  getAllLogos(): LogoConfig[] {
    return Array.from(this.logos.values());
  }
}`;

  const servicePath = 'src/app/core/services/logo.service.ts';
  await ensureDir(path.dirname(servicePath));
  await fs.writeFile(servicePath, serviceContent);
  console.log('✅ Created logo service');
};

const createOptimizedLogoComponent = async () => {
  const componentContent = `import { Component, input, computed } from '@angular/core';
import { LogoService } from '../../core/services/logo.service';

@Component({
  selector: 'app-optimized-logo',
  standalone: true,
  template: \`
    <picture>
      <source [srcset]="logoSrcset()" type="image/webp">
      <img 
        [src]="logoFallback()" 
        [alt]="alt()"
        [width]="width()"
        [height]="height()"
        [class]="cssClass()"
        loading="lazy"
      />
    </picture>
  \`,
  styles: [\`
    :host {
      display: block;
    }
    
    img {
      max-width: 100%;
      height: auto;
    }
  \`]
})
export class OptimizedLogoComponent {
  name = input<string>('');
  width = input<number>(250);
  height = input<number>(0);
  alt = input<string>('Logo');
  cssClass = input<string>('');

  logoSrcset = computed(() => {
    return this.logoService.getLogoSrcset(this.name());
  });

  logoFallback = computed(() => {
    return this.logoService.getLogoFallback(this.name());
  });

  constructor(private logoService: LogoService) {}
}`;

  const componentPath = 'src/app/shared/optimized-logo/optimized-logo.component.ts';
  await ensureDir(path.dirname(componentPath));
  await fs.writeFile(componentPath, componentContent);
  console.log('✅ Created optimized logo component');
};

const updatePackageJson = async () => {
  const packageJsonPath = 'package.json';
  
  try {
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
    
    packageJson.scripts = {
      ...packageJson.scripts,
      'optimize:logos': 'node scripts/optimize-logos.js'
    };
    
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Added logo optimization script to package.json');
  } catch (error) {
    console.error('❌ Error updating package.json:', error.message);
  }
};

const main = async () => {
  console.log('🚀 Starting logo optimization...\n');
  
  try {
    // Ensure output directory exists
    await ensureDir(outputDir);
    
    const allLogos = { ...logoConfig.navbar, ...logoConfig.footer };
    const results = [];
    
    // Optimize all logos
    for (const [logoName, config] of Object.entries(allLogos)) {
      const result = await optimizeLogo(logoName, config);
      if (result) {
        results.push(result);
      }
    }
    
    // Create service and component
    await createLogoService(results);
    await createOptimizedLogoComponent();
    await updatePackageJson();
    
    console.log('\n🎉 Logo optimization completed!');
    console.log('\n📋 Usage:');
    console.log('1. Import OptimizedLogoComponent in your navbar/footer');
    console.log('2. Use: <app-optimized-logo name="logo.png" [width]="250"></app-optimized-logo>');
    console.log('3. Run "npm run optimize:logos" to re-optimize when needed');
    
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
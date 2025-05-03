/**
 * Image Optimization Script
 * 
 * This script optimizes images in the public directory before build
 * It can be run with 'npm run optimize-images'
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const chalk = require('chalk');

const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
// More comprehensive sizes for responsive images
const SIZES = [320, 640, 768, 1024, 1280, 1536, 1920]; 
// Next-gen formats to generate
const FORMATS = ['webp', 'avif'];

// Make sure output directories exist
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Count the total bytes saved
let originalSize = 0;
let optimizedSize = 0;
let processedCount = 0;

// Process a single image
const processImage = async (filePath) => {
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  
  // Skip already optimized images
  if (baseName.includes('-optimized')) {
    return;
  }
  
  try {
    const fileStats = fs.statSync(filePath);
    originalSize += fileStats.size;
    
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Create responsive images if the original is larger than our smallest size
    if (metadata.width > SIZES[0]) {
      // Create optimized versions at different sizes
      for (const width of SIZES.filter(size => size < metadata.width)) {
        const resizedImage = image.clone().resize(width);
        
        // Generate modern formats for each size
        for (const format of FORMATS) {
          const outputDir = path.join(PUBLIC_DIR, 'img', 'responsive');
          ensureDirectoryExists(outputDir);
          
          const outputPath = path.join(outputDir, `${baseName}-${width}.${format}`);
          
          if (format === 'webp') {
            await resizedImage
              .webp({ 
                quality: 80,
                effort: 6, // Higher compression effort
                smartSubsample: true,
                nearLossless: false
              })
              .toFile(outputPath);
          } else if (format === 'avif') {
            await resizedImage
              .avif({ 
                quality: 75,
                speed: 3, // Lower speed = better quality/compression
              })
              .toFile(outputPath);
          }
          
          const outputStats = fs.statSync(outputPath);
          optimizedSize += outputStats.size;
        }
      }
    }
    
    // Create a default optimized version
    const outputDir = path.join(PUBLIC_DIR, 'img', 'optimized');
    ensureDirectoryExists(outputDir);
    
    const outputPath = path.join(outputDir, `${baseName}-optimized${ext}`);
    
    // Create optimized original format with better compression settings
    const optimizedImage = image.clone();
    
    if (ext === '.jpg' || ext === '.jpeg') {
      await optimizedImage
        .jpeg({ 
          quality: 85, 
          mozjpeg: true, 
          trellisQuantisation: true,
          overshootDeringing: true,
          optimizeScans: true
        })
        .toFile(outputPath);
    } else if (ext === '.png') {
      await optimizedImage
        .png({ 
          quality: 85, 
          compressionLevel: 9,
          palette: true
        })
        .toFile(outputPath);
    } else {
      await optimizedImage.toFile(outputPath);
    }
    
    // Create next-gen formats
    for (const format of FORMATS) {
      const outputNextGenPath = path.join(outputDir, `${baseName}-optimized.${format}`);
      
      if (format === 'webp') {
        await image
          .webp({ 
            quality: 85,
            effort: 6,
            smartSubsample: true
          })
          .toFile(outputNextGenPath);
      } else if (format === 'avif') {
        await image
          .avif({ 
            quality: 80,
            speed: 3
          })
          .toFile(outputNextGenPath);
      }
    }
    
    const outputStats = fs.statSync(outputPath);
    const webpStats = fs.statSync(path.join(outputDir, `${baseName}-optimized.webp`));
    const avifStats = fs.statSync(path.join(outputDir, `${baseName}-optimized.avif`));
    
    optimizedSize += outputStats.size + webpStats.size + avifStats.size;
    processedCount++;
    
    console.log(
      chalk.green('✅ Optimized:'), 
      chalk.blue(fileName),
      chalk.yellow(`(${(fileStats.size / 1024).toFixed(2)}KB →`),
      chalk.yellow(`${(outputStats.size / 1024).toFixed(2)}KB /`),
      chalk.yellow(`${(webpStats.size / 1024).toFixed(2)}KB webp /`),
      chalk.yellow(`${(avifStats.size / 1024).toFixed(2)}KB avif)`)
    );
  } catch (error) {
    console.error(chalk.red(`❌ Error processing ${fileName}:`), error.message);
  }
};

// Find all images in a directory recursively
const findImages = (dir) => {
  let results = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      results = results.concat(findImages(itemPath));
    } else if (
      IMAGE_EXTENSIONS.includes(path.extname(itemPath).toLowerCase())
    ) {
      results.push(itemPath);
    }
  }
  
  return results;
};

// Main function
const optimizeImages = async () => {
  console.log(chalk.blue('🔍 Finding images to optimize...'));
  
  // Skip optimized directories to avoid re-processing
  const imagesToProcess = findImages(PUBLIC_DIR).filter(
    img => !img.includes('/optimized/') && !img.includes('/responsive/')
  );
  
  console.log(chalk.blue(`🖼️ Found ${imagesToProcess.length} images to process`));
  
  for (const image of imagesToProcess) {
    await processImage(image);
  }
  
  const savedBytes = originalSize - optimizedSize;
  const savingsPercent = (savedBytes / originalSize * 100).toFixed(2);
  
  console.log(chalk.green('✨ Image optimization complete!'));
  console.log(chalk.blue(`📊 Processed ${processedCount} images`));
  console.log(
    chalk.blue(`💾 Total size reduction: ${(savedBytes / 1024 / 1024).toFixed(2)}MB (${savingsPercent}%)`)
  );
  
  // Generate HTML demo with picture elements
  generatePictureDemo(PUBLIC_DIR);
};

// Generate a demo HTML file showing how to use picture elements
const generatePictureDemo = (publicDir) => {
  const demoPath = path.join(publicDir, 'responsive-images-demo.html');
  const responsiveDir = path.join(publicDir, 'img', 'responsive');
  
  if (!fs.existsSync(responsiveDir)) {
    return;
  }
  
  const images = fs.readdirSync(responsiveDir)
    .filter(file => file.endsWith('.webp') && file.includes('-640.'));
  
  if (images.length === 0) {
    return;
  }
  
  let demoHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Images Demo</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    .image-container { margin-bottom: 40px; }
    h1 { color: #333; }
    code { background: #f5f5f5; padding: 2px 5px; border-radius: 4px; }
    .picture-example { background: #eee; padding: 15px; border-radius: 8px; margin-top: 10px; }
  </style>
</head>
<body>
  <h1>Responsive Images Usage Examples</h1>
  <p>The following examples show how to use the optimized responsive images:</p>
  
`;

  for (let i = 0; i < Math.min(5, images.length); i++) {
    const imageBase = images[i].replace('-640.webp', '');
    
    demoHtml += `
  <div class="image-container">
    <h3>Example ${i + 1}: ${imageBase}</h3>
    
    <div class="picture-example">
      <picture>
        <!-- AVIF format for browsers that support it -->
        <source
          type="image/avif"
          srcset="
            /img/responsive/${imageBase}-320.avif 320w,
            /img/responsive/${imageBase}-640.avif 640w,
            /img/responsive/${imageBase}-1024.avif 1024w
          "
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        <!-- WebP format as fallback -->
        <source
          type="image/webp"
          srcset="
            /img/responsive/${imageBase}-320.webp 320w,
            /img/responsive/${imageBase}-640.webp 640w,
            /img/responsive/${imageBase}-1024.webp 1024w
          "
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        <!-- Original format as final fallback -->
        <img
          src="/img/optimized/${imageBase}-optimized.jpg"
          alt="${imageBase}"
          loading="lazy"
          width="640"
          height="400"
          style="max-width: 100%; height: auto;"
        />
      </picture>
    </div>
    
    <h4>React Component Usage:</h4>
    <pre><code>
&lt;picture&gt;
  &lt;source
    type="image/avif"
    srcSet="
      /img/responsive/${imageBase}-320.avif 320w,
      /img/responsive/${imageBase}-640.avif 640w,
      /img/responsive/${imageBase}-1024.avif 1024w
    "
    sizes="(max-width: 768px) 100vw, 50vw"
  /&gt;
  &lt;source
    type="image/webp"
    srcSet="
      /img/responsive/${imageBase}-320.webp 320w,
      /img/responsive/${imageBase}-640.webp 640w,
      /img/responsive/${imageBase}-1024.webp 1024w
    "
    sizes="(max-width: 768px) 100vw, 50vw"
  /&gt;
  &lt;img
    src="/img/optimized/${imageBase}-optimized.jpg"
    alt="${imageBase}"
    loading="lazy"
    width="640"
    height="400"
    style={{ maxWidth: '100%', height: 'auto' }}
  /&gt;
&lt;/picture&gt;
    </code></pre>
  </div>
    `;
  }

  demoHtml += `
</body>
</html>
  `;
  
  fs.writeFileSync(demoPath, demoHtml);
  console.log(chalk.green('✅ Generated responsive images demo:'), chalk.blue(demoPath));
};

// Run the script
optimizeImages().catch(error => {
  console.error(chalk.red('Error during image optimization:'), error);
  process.exit(1);
}); 
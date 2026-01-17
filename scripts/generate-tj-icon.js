const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { Buffer } = require('buffer');

// Create SVG template for TJ icon
const createTJIcon = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.176}" fill="#007AFF"/>
  <text x="${size/2}" y="${size * 0.65}" font-family="Arial, sans-serif" 
        font-size="${size * 0.3}" font-weight="700" fill="white" 
        text-anchor="middle" letter-spacing="${size * 0.02}">TJ</text>
  ${size >= 120 ? `<circle cx="${size * 0.83}" cy="${size * 0.83}" r="${size * 0.08}" fill="#34C759" stroke="white" stroke-width="${size * 0.004}"/>
  <path d="M ${size * 0.8} ${size * 0.83} L ${size * 0.82} ${size * 0.85} L ${size * 0.86} ${size * 0.81}" stroke="white" stroke-width="${size * 0.012}" fill="none" stroke-linecap="round"/>` : ''}
</svg>
`;

// Icon sizes with custom TJ naming
const iconSizes = [
  { name: 'tj-icon@2x.png', size: 40, iosSize: '20x20', scale: '2x' },
  { name: 'tj-icon@3x.png', size: 60, iosSize: '20x20', scale: '3x' },
  { name: 'tj-icon-29@2x.png', size: 58, iosSize: '29x29', scale: '2x' },
  { name: 'tj-icon-29@3x.png', size: 87, iosSize: '29x29', scale: '3x' },
  { name: 'tj-icon-40@2x.png', size: 80, iosSize: '40x40', scale: '2x' },
  { name: 'tj-icon-40@3x.png', size: 120, iosSize: '40x40', scale: '3x' },
  { name: 'tj-icon-60@2x.png', size: 120, iosSize: '60x60', scale: '2x' },
  { name: 'tj-icon-60@3x.png', size: 180, iosSize: '60x60', scale: '3x' },
  { name: 'tj-icon-1024@1x.png', size: 1024, iosSize: '1024x1024', scale: '1x' }
];

// Create output directory
const outputDir = 'ios/DetoxDemo/Images.xcassets/AppIcon.appiconset';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate TJ icons function
async function generateTJIcons() {
  try {
    console.log('Generating TJ icons for Detox Demo Project...');
    
    for (const { name, size } of iconSizes) {
      const svg = createTJIcon(size);
      const outputPath = path.join(outputDir, name);
      
      await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }
    
    console.log('\n✅ All TJ icon templates created for iOS app');
    
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

// Run the generation
generateTJIcons();
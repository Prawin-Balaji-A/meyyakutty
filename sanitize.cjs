const fs = require('fs');
const path = require('path');

const publicImages = path.join(__dirname, 'public', 'images');
const contextPath = path.join(__dirname, 'src', 'context', 'ShopContext.jsx');

let contextContent = fs.readFileSync(contextPath, 'utf8');

function sanitizeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9.]/g, '_').replace(/_+/g, '_');
}

// Find all files in public/images recursively
function walkSync(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      if (file !== 'clean') {
        filelist = walkSync(filepath, filelist);
      }
    } else {
      filelist.push(filepath);
    }
  }
  return filelist;
}

const allFiles = walkSync(publicImages);

// Create a flat folder for sanitized images
const cleanDir = path.join(publicImages, 'clean');
if (!fs.existsSync(cleanDir)) fs.mkdirSync(cleanDir);

const map = {};

for (const filepath of allFiles) {
  const basename = path.basename(filepath);
  // ignore hidden files or non-images
  if (!basename.match(/\.(jpg|jpeg|png|webp|gif)$/i)) continue;
  
  const cleanName = sanitizeName(basename);
  const newPath = path.join(cleanDir, cleanName);
  
  // Copy file to new path
  fs.copyFileSync(filepath, newPath);
  
  map[basename] = `/images/clean/${cleanName}`;
}

// Now replace in ShopContext
let newContextContent = contextContent;
const regex = /imageUrl:\s*'([^']+)'/g;

let count = 0;
newContextContent = newContextContent.replace(regex, (match, oldUrl) => {
  const decodedOldUrl = decodeURIComponent(oldUrl); // in case it had %20
  const basename = path.basename(decodedOldUrl);
  if (map[basename]) {
    count++;
    return `imageUrl: '${map[basename]}'`;
  }
  return match;
});

fs.writeFileSync(contextPath, newContextContent);
console.log(`Sanitization complete! Updated ${count} image URLs in ShopContext.jsx.`);

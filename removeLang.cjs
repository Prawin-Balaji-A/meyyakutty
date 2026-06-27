const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // {lang === 'en' ? 'Text' : 'Text'} -> 'Text' (inside JSX)
    content = content.replace(/\{lang\s*===\s*'en'\s*\?\s*('[^']+')\s*:\s*('[^']+')\}/g, "$1");
    content = content.replace(/\{lang\s*===\s*'en'\s*\?\s*("[^"]+")\s*:\s*("[^"]+")\}/g, "$1");
    
    // lang === 'en' ? 'Text' : 'Text' -> 'Text'
    content = content.replace(/lang\s*===\s*'en'\s*\?\s*('[^']+')\s*:\s*('[^']+')/g, "$1");
    content = content.replace(/lang\s*===\s*'en'\s*\?\s*("[^"]+")\s*:\s*("[^"]+")/g, "$1");

    // Remove useLanguage imports
    content = content.replace(/import\s*\{\s*useLanguage\s*\}\s*from\s*['"]\.\.?\/context\/LanguageContext['"];?\n?/g, '');
    
    // Remove const { lang } = useLanguage();
    content = content.replace(/\s*const\s*\{\s*lang(?:,\s*toggleLang)?\s*\}\s*=\s*useLanguage\(\);?\n?/g, '\n');

    fs.writeFileSync(filePath, content);
}

const files = [
    'src/pages/ShopPage.jsx',
    'src/pages/SellCarePage.jsx',
    'src/pages/HomePage.jsx',
    'src/context/NotificationContext.jsx',
    'src/components/NotificationDrawer.jsx'
];

files.forEach(f => {
    try {
        replaceInFile(path.join(__dirname, f));
        console.log('Updated ' + f);
    } catch(e) {
        console.error('Failed ' + f, e);
    }
});

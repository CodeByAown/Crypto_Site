const fs = require('fs');
const path = require('path');

// Root directory is one level up from scripts/
const directoryPath = path.join(__dirname, '../');
const footerPath = path.join(__dirname, '../new_footer.html');

try {
    const newFooterContent = fs.readFileSync(footerPath, 'utf8');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach((file) => {
            if (path.extname(file) === '.html' && file !== 'new_footer.html' && file !== 'footer.html') {
                const filePath = path.join(directoryPath, file);

                // Simple validation to ensure it's a file
                try {
                    const stats = fs.statSync(filePath);
                    if (!stats.isFile()) return;
                } catch (e) { return; }

                let content = fs.readFileSync(filePath, 'utf8');

                // Regex to match existing footer
                const footerRegex = /<footer[\s\S]*?<\/footer>/i;

                if (footerRegex.test(content)) {
                    const newContent = content.replace(footerRegex, newFooterContent);
                    fs.writeFileSync(filePath, newContent, 'utf8');
                    console.log(`Updated footer in: ${file}`);
                } else {
                    console.log(`No footer found in: ${file}`);
                }
            }
        });
    });
} catch (err) {
    console.error('Error:', err);
}

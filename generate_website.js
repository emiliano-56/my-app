const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const axios = require('axios');
const archiver = require('archiver');
const FormData = require('form-data');
const session = require('express-session');
const fse = require('fs-extra'); // for copying directories

const app = express();
const PORT = 5000;

const NETLIFY_ACCESS_TOKEN = 'nfp_x5exD9HnrfDrh52m6THBDYhjhnAvTpJR9d55';
const NETLIFY_SITE_NAME = 'd8d3d7b0-3bf2-4ec4-88cf-39c4da226824';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/website', express.static(path.join(__dirname, 'website')));

app.use(session({
    secret: 'your_secret_key', // Change this to a secure key
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

function ensureAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/');
}

app.get('/index.html', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'dlucky171@gmail.com' && password === 'dcode') {
        req.session.isAuthenticated = true;
        res.json({ success: true });
    } else {
        req.session.isAuthenticated = false;
        res.json({ success: false });
    }
});



app.post('/generate', ensureAuthenticated, (req, res) => {
    const { businessName, logoUrl, logoWidth, contentText, template } = req.body;

    const templateDir = path.join(__dirname, `templates/${template}`);
    const templatePath = path.join(templateDir, `${template}.html`); // Assuming template name matches the HTML file name

    fs.readFile(templatePath, 'utf8', (err, templateContent) => {
        if (err) {
            console.error('Error reading template file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const compiledTemplate = Handlebars.compile(templateContent);
        const renderedHtml = compiledTemplate({
            business_name: businessName,
            logo_url: logoUrl,
            logo_width: logoWidth,
            content_text: contentText
        });

        const outputDir = path.join(__dirname, 'website');
        
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        // Copy template assets directly to the output directory
        fse.copySync(path.join(templateDir, 'css'), path.join(outputDir, 'css'));
        fse.copySync(path.join(templateDir, 'js'), path.join(outputDir, 'js'));
        fse.copySync(path.join(templateDir, 'images'), path.join(outputDir, 'images'));

        // Additional folders to copy
        fse.copySync(path.join(templateDir, 'fonts'), path.join(outputDir, 'fonts'));
        fse.copySync(path.join(templateDir, 'scss'), path.join(outputDir, 'scss'));
        fse.copySync(path.join(templateDir, 'scss'), path.join(outputDir, 'vendors'));
        // fse.copySync(path.join(templateDir, 'libs'), path.join(outputDir, 'libs'));
        // Write the HTML file
        const outputPath = path.join(outputDir, 'index.html');
        fs.writeFile(outputPath, renderedHtml, (err) => {
            if (err) {
                console.error('Error writing generated website file:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            console.log('Website generated successfully!');
            res.json({
                url: '/website/index.html',
                viewUrl: `http://localhost:${PORT}/website/index.html`,
                downloadUrl: '/download-zip'
            });
        });
    });
});





app.post('/publish', ensureAuthenticated, (req, res) => {
    const outputDir = path.join(__dirname, 'website');
    const zipPath = path.join(__dirname, 'website.zip');

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip');

    output.on('close', async () => {
        console.log(`Zip file ${zipPath} has been created`);

        try {
            const form = new FormData();
            form.append('file', fs.createReadStream(zipPath));

            const response = await axios.post(`https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_NAME}/deploys`, form, {
                headers: {
                    'Authorization': `Bearer ${NETLIFY_ACCESS_TOKEN}`,
                    ...form.getHeaders(),
                }
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Website published successfully!');
                res.json({ url: response.data.deploy_ssl_url });
            } else {
                console.error('Failed to publish website:', response.data);
                res.status(500).json({ error: 'Failed to publish website' });
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response from Netlify:', error.response.data);
                res.status(500).json({ error: error.response.data });
            } else {
                console.error('Error publishing website:', error.message);
                res.status(500).json({ error: 'Error publishing website' });
            }
        }
    });

    archive.on('error', (err) => {
        console.error('Archive error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });

    archive.pipe(output);
    archive.directory(outputDir, false);
    archive.finalize();
});

app.post('/logout', (req, res) => {
    req.session.isAuthenticated = false;
    res.json({ message: 'oops!, logging out, byeee!...thanks for using me!. It was really a nice one generating templates for you.' });
});

app.get('/download-zip', ensureAuthenticated, (req, res) => {
    const zipPath = path.join(__dirname, 'website.zip');
    if (fs.existsSync(zipPath)) {
        res.download(zipPath, 'website.zip', (err) => {
            if (err) {
                console.error('Error downloading the zip file:', err);
                res.status(500).json({ error: 'Error downloading the zip file' });
            }
        });
    } else {
        res.status(404).json({ error: 'Zip file not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

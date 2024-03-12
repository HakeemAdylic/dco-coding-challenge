const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'assets', 'css', and 'js' directories
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Serve your HTML files
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

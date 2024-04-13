const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/blog', require('./routes/blogRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));

console.log('Server is listening on port', port);

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;

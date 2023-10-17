const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
mongoose.connect('//your url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
});
const bugSchema = new mongoose.Schema({
  bugType: String,
  subject: String,
  description: String,
  bugFile: String,
});
const Bug = mongoose.model('Bug', bugSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api/bug', async (req, res) => {
  try {
    const { bugType, subject, description, bugFile } = req.body;

    const bug = new Bug({
      bugType,
      subject,
      description,
      bugFile,
    });

    await bug.save();

    res.status(201).json({ message: 'Bug report submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

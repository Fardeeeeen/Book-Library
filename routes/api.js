// routes/api.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/covers/:isbn', async (req, res) => {
  try {
    const { isbn } = req.params;
    const defaultParam = req.query.default === 'false' ? '?default=false' : '';

    // Construct the URL based on the provided parameters
    const url = `https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg${defaultParam}`;

    // Fetch the image from the Open Library API and directly send it as the response
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];
    
    res.setHeader('Content-Type', contentType);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
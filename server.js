const express = require('express');
const pinterest = require('pinterest-scraper');
const app = express();

// Use the PORT environment variable provided by Render
const PORT = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) return res.status(400).json({ error: 'Keyword required' });

  try {
    console.log(`Scraping for: ${keyword}`);
    // Using the library to fetch pins
    const pins = await pinterest(keyword);

    // Return only the image URLs to keep it simple
    const images = pins.map(pin => pin.image).filter(img => img);

    res.json({ images: images.slice(0, 15) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Scraping failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

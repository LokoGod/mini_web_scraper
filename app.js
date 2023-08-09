const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/data', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://itcircle.lk/product-category/laptop-desktop/laptops/used-laptops/');
  
  const articles = await page.evaluate(() => {
    const articleTitles = [];
    const titleElements = document.querySelectorAll('h2, bdi');
    
    titleElements.forEach((element) => {
      articleTitles.push(element.textContent);
    });
    
    return articleTitles;
  });
  
  await browser.close();
  
  res.json(articles);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import puppeteer from "puppeteer";
import fs from "fs";

const scrape = async () => {
  // Open the browser and navigate to the website
  const browser = await puppeteer.launch();
  // 
  const page = await browser.newPage();

  const allBooks = []; // Array to store all the books
  
  let currentPage = 1; // Start from page 1
  let maxPages = 10; // Maximum number of pages to scrape

  // Loop through all the pages and scrape the data
  while (currentPage <= maxPages) {
    const url = `https://books.toscrape.com/catalogue/page-${currentPage}.html`;
    await page.goto(url); // Go to the website



    const books = await page.evaluate(() => {
      const bookElements = document.querySelectorAll('.product_pod');
      return Array.from(bookElements).map((book) => {
        const title = book.querySelector('h3 a').getAttribute('title');
        const price = book.querySelector('.price_color').innerText;
        const stock = book.querySelector('.instock.availability') ? 'In Stock' : 'Out of Stock';
        const rating = book.querySelector('.star-rating').className.split(' ')[1];
        const link = book.querySelector('h3 a').href;

        return {
          title,
          price,
          stock,
          rating,
          link
        };
      })
    });

    // Push the books to the allBooks array
    allBooks.push(...books);
    console.log(`Scraped page ${currentPage}`, books);
    currentPage++;
  }

  
  

  

  // Write the data to a json file
  fs.writeFile('books.json', JSON.stringify(allBooks, null, 2), (err) => {
    if (err) throw err;
    console.log('Data has been written to file');
  });
  
  await browser.close(); // Close the browser
};

scrape();
import puppeteer from "puppeteer";
import fs from "fs";

const scrape = async () => {
  // Open the browser and navigate to the website
  const browser = await puppeteer.launch();
  // 
  const page = await browser.newPage();
  
  const url = "https://books.toscrape.com/";
  await page.goto(url); // Go to the website


  // GET PAGE TITLE
  // const result = await page.evaluate(() => {
  //   return document.title;
  // });
  // console.log(result);

  // ======0R ======
  
  // const title = await page.title();
  // console.log("Page title is " + title);


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

  console.log(books);

  // Write the data to a json file
  fs.writeFile('books.json', JSON.stringify(books, null, 2), (err) => {
    if (err) throw err;
    console.log('Data has been written to file');
  });
  
  await browser.close(); // Close the browser
};

scrape();
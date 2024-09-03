import puppeteer from "puppeteer";

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

  
  await browser.close(); // Close the browser
};

scrape();
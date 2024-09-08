import puppeteer from "puppeteer";
// import fs from "fs";

const scrape = async () => {
  // Open the browser and navigate to the website
  const browser = await puppeteer.launch();
  // 
  const page = await browser.newPage();
 
  const allSpareParts = []; // Array to store all the spare parts

  const url = `https://www.autodoc.co.uk/spares-search?keyword=oil+filter`;
  await page.goto(url, {waitUntil: "networkidle2"}); // Go to the website and wait for it to load completely


// Delay for 10 seconds
  // await new Promise(resolve => setTimeout(resolve, 10000));

// Wait for a specific element to be present on the page
  await page.waitForSelector('.listing-item__wrap');

  // const title = await page.title();
  // console.log(title);

  const spareParts = await page.evaluate(() => {
    const sparePartElements = document.querySelectorAll('.listing-item__wrap');
    
    return Array.from(sparePartElements).map((sparePart) =>{
      const partManufacturer = sparePart.querySelector('.listing-item__description-header span').innerText;
      const partName = sparePart.querySelector('.listing-item__description-header .listing-item__name .listing-item__name-span').innerText;
      const partPrice = sparePart.querySelector('.listing-item__price-box .list-item__price-new').innerHTML;
      const partAvailability = sparePart.querySelector('.listing-item__price-box .list-item__available').innerHTML;

      return {
        partManufacturer,
        partName,
        partPrice: partPrice ? partPrice : null,
        partAvailability: partAvailability ? partAvailability : null,
      };
    })

    
  });

  console.log(spareParts);
  

  await browser.close(); // Close the browser
};

scrape();
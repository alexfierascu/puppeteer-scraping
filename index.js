//https://www.youtube.com/watch?v=S67gyqnYHmI&ab_channel=TraversyMedia
//https://pptr.dev/

const puppeteer = require('puppeteer');
const { write_to_file, create_folder } = require('utils/filefunction');

const date = new Date();
const generalPath = `scrapped-resources/${date.toString()}`;
const URL = 'https://traversymedia.com';

const run = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    create_folder(generalPath);
    const pageTitle = await page.evaluate(() => document.title);

    await page.screenshot({ path: `${generalPath}/${pageTitle}.png`, fullPage: true });
    await page.pdf({ path: `${generalPath}/${pageTitle}.pdf`, fullPage: true });

    // const courses = await page.evaluate(() =>
    //     Array.from(document.querySelectorAll('#courses .card'), (element) => ({
    //         title: element.querySelector('.card-body h3').innerText,
    //         level: element.querySelector('.card-body .level').innerText,
    //         url: element.querySelector('.card-footer a').innerText,
    //         promoCode: element.querySelector('.card-footer .promo-code .promo').innerText,
    //     }))
    // );

    const courses = await page.$$eval('#courses .card', (elements) => elements.map(element => ({
        title: element.querySelector('.card-body h3').innerText,
        level: element.querySelector('.card-body .level').innerText,
        url: element.querySelector('.card-footer a').innerText,
        promoCode: element.querySelector('.card-footer .promo-code .promo').innerText,
    })));

    write_to_file(courses);

    await browser.close();
};


run();
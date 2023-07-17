import puppeteer from 'puppeteer';
import { Browser } from 'puppeteer';
import { Settings } from '../config/settings';
import { Offer } from '../models/offer';





async function scrap() {
    var offers: Offer[] = [];
    const maxScrapCount = 500;
    const itemsPerPage = 20;
    for (let i = 1; i <= (maxScrapCount / itemsPerPage); i++) {
        let url = Settings.scrapUrl.replace('{pageNumber}', i.toString());
        let offersData = await doScrap(url);
        offersData.map((offer: Offer) => {
            offer.link = Settings.baseUrl + offer.link;
        });
        offersData.forEach((offer) => {
            offers.push(offer);
        });

        if (offersData.length >= maxScrapCount) {
            offers = offers.slice(0, maxScrapCount);
            break;
        }
        delay(1000);
    }
    return offers;
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}





const doScrap = async (url: string) => {
    const browser: Browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'load', timeout: 0 })
    const offerData = await page.evaluate((url) => {
        const realstateOffer = Array.from(document.querySelectorAll('.property'));
        const data = realstateOffer.map((offer: any) => ({
            title: offer.querySelector("span .name").innerText,
            price: offer.querySelector('span .norm-price').innerText,
            imgSrc: offer.querySelector('div ._2xzMRvpz7TDA2twKCXTS4R').
                querySelector('img').getAttribute("src"),
            link: offer.querySelector('.title').getAttribute('href'),
            description: offer.querySelector('span .locality').innerText
        }));
        return data;
    }, url)
    await browser.close();
    return offerData;
}


export default {
    scrap
};





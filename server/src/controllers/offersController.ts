import { Request, Response, json, response } from "express";
import offersService from "../services/offersService";
import { OfferResponse } from "../models/offerResponse";
import scrapService from "../services/scrapService";
import dbService from "../services/dbService";

async function getOffers(req: Request, res: Response) {
  try {
    let page: number = 1;
    if (req.query['page'])
      page = parseInt(req.query['page'].toString());
    const offersResponse: OfferResponse = await offersService.getOffers(page);
    res.status(200);
    res.send(offersResponse);
  } catch (err: any) {
    res.status(500);
    res.send(err)
  }
  return res;
}


async function addOffer(req: Request, res: Response) {
  dbService.initDb();
  try {
    let scrapOffers = await scrapService.scrap();
    const result = await offersService.addOffers(scrapOffers);
    await getOffers(req, res);
  } catch (err: any) {
    console.log(err);
    res.status(500).send("There was a problem please try later");
  }
}


export default {
  getOffers,
  addOffer
};
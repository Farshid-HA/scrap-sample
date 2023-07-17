import { DbConfig } from "../config/dbConfig";
import { OfferResponse } from "../models/offerResponse";

async function getOffers(page = 1) {
  const recordPerPage = 24;
  const limit = recordPerPage;
  const offset = recordPerPage * (page - 1);
  try {
    const offers = await DbConfig.pool.query("SELECT * FROM offer LIMIT $1 OFFSET $2", [limit, offset]);
    const count = await DbConfig.pool.query("SELECT COUNT(*) FROM offer");

    let res: OfferResponse = {
      recordCount: parseInt(count.rows[0].count),
      data: offers.rows,
      page: page,
      pageCount: Math.ceil(parseInt(count.rows[0].count.toString()) / recordPerPage),
    };
    return res;
  } catch (err) {
    return err;
  }
}


async function addOffers(offers: any) {
  for (let offer of offers) {
    if (offer.imgSrc != "" && offer.title != "" && offer.link != "") {
      try {
        await DbConfig.pool.query("INSERT INTO offer(title,price,imgSrc,link,description) VALUES($1,$2,$3,$4,$5) ", [offer.title, offer.price, offer.imgSrc, offer.link, offer.description], (error) => {
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log("Records added to db");
}
export default {
  getOffers,
  addOffers
};





import { Offer } from "./offer";

export interface OfferResponse {
    pageCount: number;
    recordCount: number;
    page: number;
    data: Offer[];

}
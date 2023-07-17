import { useEffect, useState } from "react";
import { Offer } from "../models/offer";
import { OfferResponse } from "../models/offerResponse";
import { Settings } from "../config/settings";


const OfferList = () => {

    const [list, setList] = useState<OfferResponse>({
        recordCount: 0,
        data: [] as Offer[],
        page: 1,
        pageCount: 0
    });
    const Url: string = Settings.apiBaseUrl + "/offers/";
    const urlAdd: string = Settings.apiBaseUrl + "/offers/addOffer";
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(0);
    const [isScraping, setIsScraping] = useState<boolean>(false);
    const numberOfPage: number[] = [];
    function getOffers(page: number) {
        fetch(Url + "?page=" + page).then((res) => {
            return res.json();
        }).then((res: OfferResponse) => {
            setList(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    for (let index = 1; index <= pageCount; index++) {
        numberOfPage.push(index);
    }
    useEffect(() => {
        fetch(Url + "?page=1").then((res) => {
            return res.json();
        }).then((res: OfferResponse) => {
            if (res && res.recordCount > 0) {
                setList(res);
                setCurrentPage(res.page);
                setPageCount(res.pageCount);
            }
        })
            .catch((err) => {
                console.log(err);
            });

    }, [])



    return (
        <div className="container">
            <div className="row m-5">
                {list && list.data.length > 0 &&

                    list.data.map((lst: Offer, index: number) => {
                        return (
                            <div className="col-md-4 col-sm-12 m-auto " key={index}>
                                <div className="card  mt-2" >
                                    <img className="card-img-top" src={lst?.imgsrc} />
                                    <div className="card-body">
                                        <h5 className="card-title">{lst?.title}</h5>
                                        <p className="card-text">{lst?.description}</p>
                                        <p className="card-text">{lst?.price}</p>
                                        <a href={lst?.link} className="btn btn-primary">More Details...</a>
                                    </div>
                                </div>
                            </div>
                        )

                    })

                }
                {isScraping && list && list.data.length < 1 &&
                    <div className="row col-md-6 col-sm-11 m-auto md-m-5 sm-m-1  text-center">
                        <div className="  m-auto shadow-lg p-3 m-5 bg-body-tertiary rounded">
                            <div className="spinner-grow text-primary m-1" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow text-secondary  m-1" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow text-success  m-1" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow text-danger  m-1" role="status">
                                <span className="visually-hidden  m-1">Loading...</span>
                            </div>



                            <div className="mt-5 text-center">
                                <p className="display-6">
                                    Scraping...
                                </p>
                                <p>
                                    Please wait...
                                </p>
                            </div>
                        </div>
                    </div>

                }
            </div>


            {!isScraping && list && list.data.length < 1 &&
                <div className="row col-md-6  col-sm-12 m-auto">
                    <div className="shadow-lg md-p-3 sm-p-1 md-m-5 sm-m-1 bg-body-tertiary rounded">
                        <p className="h5 Lead p-3 m-auto text-center"> There is no record in db. Please scrap the data first and then try again.</p>
                        <div className="mt-5 mb-3 text-center">
                            <button className="btn btn-primary" onClick={scrap} >Scrap Data</button>
                        </div>
                    </div>
                </div>
            }



            <div className="row m-5">
                {list && list.pageCount > 1 &&
                    <div className="md-m-5 sm-m-1 ">
                        <nav aria-label="..." className="Page navigation example">
                            <ul className="pagination flex-wrap">
                                <li className="page-item">
                                    <a className="page-link" href="#" onClick={previousPage}>Previous</a>
                                </li>
                                {
                                    numberOfPage?.map((number) => {
                                        return (
                                            <li className={`page-item ${currentPage === number ? 'active' : ''}`} onClick={() => changePage(number)}><a className="page-link" href="#">{number}</a></li>
                                        )
                                    })
                                }
                                <li className="page-item">
                                    <a className="page-link" href="#" onClick={nextPage}>Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                }
            </div>

        </div>

    );
    function nextPage() {
        if (currentPage < pageCount!) {
            setCurrentPage(currentPage + 1)
            getOffers(currentPage + 1);
        } else {
            setCurrentPage(pageCount);
            getOffers(pageCount);
        }

    }
    function previousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            getOffers(currentPage - 1);
        } else {
            setCurrentPage(1);
            getOffers(1);
        }

    }
    async function changePage(number: number) {
        console.log(number);
        setCurrentPage(number)
        getOffers(number);
    }
    function scrap() {
        setIsScraping(true);
        fetch(urlAdd, {
            method: 'post'
        }).then((res) => {
            return res.json();
        }).then((data: OfferResponse) => {
            window.location.reload();
            setIsScraping(false);
        })
    }
}


export default OfferList;
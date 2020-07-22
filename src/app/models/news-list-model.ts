import { NewsModel } from './news-model';


export class NewsList {
    pageNo: number;
    newsPerPage: number;
    newslist: Array<NewsModel>;
    maxPageNo: number;
    constructor({
        page = 0,
        hitsPerPage = 0,
        hits = [],
        nbPages = 0
    } = {}
    ) {
        this.pageNo = page;
        this.newsPerPage = hitsPerPage;
        this.newslist = hits.map(news => new NewsModel(news));
        this.maxPageNo = nbPages;
    }
}

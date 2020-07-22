
export class NewsModel {

    author: string;
    hoursLeft: number;
    numComments: number;
    objectId: string;
    title: string;
    url: string;
    siteUrl: string;
    hidden: boolean;
    upVoteCount: number;
    constructor({
        author = '',
        created_at = '',
        num_comments = 0,
        objectID = '',
        title = '',
        url = '',
    }) {
        this.author = author && author !== null ? author : '';
        this.hoursLeft = created_at === '' || !created_at ? 0 :
                         Math.round((new Date().getTime() - new Date(created_at).getTime()) / 3600000);
        this.numComments = num_comments && num_comments !== null ? num_comments : 0;
        this.objectId = objectID;
        this.title = title && title !== null ? title : 'No title given by api';
        this.url = url && url !== null ? url : 'No url given by api';
        this.siteUrl = url === '' || !url ? '' : url.indexOf('/') > -1 ? url.substr(0, url.indexOf('/', url.indexOf('.'))) : url;
        this.hidden = false;
        this.upVoteCount = 0;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
}

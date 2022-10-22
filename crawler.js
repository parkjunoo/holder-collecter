class Crawler {
    constructor() {
        this.maxConnections = 10;
        this.callback = function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            console.log($("title").text());
            console.log($);
        }
        done();
        };
    }

}
//This is the Recognant API which will be used for Summarization of text. One can specify summary with number of characters wanted.
//It's important to note this API can only be used for free 3 times per day.
function summarizer(length, link) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://enelyou-enelyou-summarization--index--summary--topic--part-of-s.p.rapidapi.com/sumpagejson/",
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "enelyou-enelyou-summarization--index--summary--topic--part-of-s.p.rapidapi.com",
            "x-rapidapi-key": "51ed23e58fmsh56c37a59f3d5ed5p140adcjsnb0789218f3fb",
            "content-type": "application/x-www-form-urlencoded"
        },
        //These are the required parameters. The Length, and the URL (Our website preferably).
        "data": {
            "length": length,
            "url": link
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}
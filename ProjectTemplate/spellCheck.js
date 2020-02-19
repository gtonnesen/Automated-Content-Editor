getSubscriptionKey = function () {

    var COOKIE = "bing-spell-check-api-key";

    function findCookie(name) {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var keyvalue = cookies[i].split("=");
            if (keyvalue[0].trim() === name) {
                return keyvalue[1];
            }
        }
        return "";
    }

    function getSubscriptionKeyCookie() {
        var key = findCookie(COOKIE);
        while (key.length !== 32) {
            key = prompt("Enter Bing Spell Check API subscription key:", "").trim();
            var expiry = new Date();
            expiry.setFullYear(expiry.getFullYear() + 2);
            document.cookie = COOKIE + "=" + key.trim() + "; expires=" + expiry.toUTCString();
        }
        return key;
    }

    function getSubscriptionKeyCookie() {
        var key = findCookie(COOKIE);
        while (key.length !== 32) {
            key = prompt("Enter Bing Spell Check API subscription key:", "").trim();
            var expiry = new Date();
            expiry.setFullYear(expiry.getFullYear() + 2);
            document.cookie = COOKIE + "=" + key.trim() + "; expires=" + expiry.toUTCString();
        }
        return key;
    }

    function getSubscriptionKey(invalidate) {
        if (invalidate) {
            try {
                localStorage.removeItem(COOKIE);
            } catch (e) {
                document.cookie = COOKIE + "=";
            }
        } else {
            try {
                return getSubscriptionKeyLocalStorage();
            } catch (e) {
                return getSubscriptionKeyCookie();
            }
        }
    }

    return getSubscriptionKey;

}();

function pre(text) {
    return "<pre>" + text.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</pre>"
}

function renderSearchResults(results) {
    //Refresh for future uses
    document.getElementById('resultsOfWrong').innerHTML = "Mispelled Words: ";
    document.getElementById('resultsOfRight').innerHTML = "Possible Corrections: ";

    //Logging the results of the first wrong suggestion.
    console.log(JSON.stringify(results.flaggedTokens[0].token));
    console.log(JSON.stringify(results.flaggedTokens[0].suggestions[0].suggestion));
    //variable to hold each wrong word and their "right" counterpart
    var mispelledWord = [];
    var correctSpelledWord = [];
    //looping through and adding to each of these lists.
    for (var i = 0; i < results.flaggedTokens.length; i++) {
        mispelledWord[i] = JSON.stringify(results.flaggedTokens[i].token);
        //log the mispelled word
        console.log(JSON.stringify(results.flaggedTokens[i].token))

        correctSpelledWord[i] = JSON.stringify(results.flaggedTokens[i].suggestions[0].suggestion);
        //log the mispelled word
        console.log(JSON.stringify(results.flaggedTokens[i].suggestions[0].suggestion));
    }
    
    var improperWords = document.getElementById('resultsOfWrong');
    var properWords = document.getElementById('resultsOfRight');
    //Add to the current HTML elements.
    for (var i = 0; i < mispelledWord.length; i++) {
        //add to the different paragraphs.
        properWords.innerHTML += correctSpelledWord[i] + "  ";
        improperWords.innerHTML += mispelledWord[i] + "  ";
    }

    //Make Results appear.
    document.getElementById('results').style.display = "block";
    //Clear out arrays for second use when time comes
    mispelledWord = [];
    correctSpelledWord = [];
    //document.getElementById("results").innerHTML = pre(JSON.stringify(results, null, 2));
}

function renderErrorMessage(message, code) {
    if (code)
        document.getElementById("results").innerHTML = "<pre>Status " + code + ": " + message + "</pre>";
    else
        document.getElementById("results").innerHTML = "<pre>" + message + "</pre>";
}

function bingSpellCheck(key) {
    var text = document.getElementById('editor').textContent;

    //var endpoint = "https://leslie.cognitiveservices.azure.com/bing/v7.0/spellcheck";
    var endpoint = "https://api.cognitive.microsoft.com/bing/v7.0/spellcheck/";

    var request = new XMLHttpRequest();

    try {
        request.open("GET", endpoint + "?mode=proof&mkt=en-US&text=" + encodeURIComponent(text));
    }
    catch (e) {
        renderErrorMessage("Bad request");
        return false;
    }

    request.setRequestHeader("Ocp-Apim-Subscription-Key", key);

    request.addEventListener("load", function () {
        if (this.status === 200) {
            renderSearchResults(JSON.parse(this.responseText));
        }
        else {
            if (this.status === 401) getSubscriptionKey(true);
            renderErrorMessage(this.statusText, this.status);
        }
    });

    request.addEventListener("error", function () {
        renderErrorMessage("Network error");
    });

    request.addEventListener("abort", function () {
        renderErrorMessage("Request aborted");
    });

    request.send();
    return false;
}

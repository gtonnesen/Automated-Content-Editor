
var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['image', 'video', 'formula'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }]
];

var quill = new Quill('#editor', {  // <<use this div id for the editor
    modules: {
        toolbar: toolbarOptions
    },
    scrollingContainer: '#editorBox',
    theme: 'snow'
});

function calculateGradeLevel(outputId) {
    var text = quill.getText(0);
    let wordCount = getWordCount(text);
    let syllableCount = getSyllableCount(text);
    let sentenceCount = getSentenceCount(text);
    let gradeLevel = 0.39 * (wordCount / sentenceCount) + 11.8 * (syllableCount / wordCount) - 15.59;
    if (gradeLevel > 12) {
        document.getElementById(outputId).innerHTML = "12th Grade +";
    }
    else {
        document.getElementById(outputId).innerHTML = gradeLevel.toFixed(0).toString() + "th Grade";
    }
    document.getElementById('readingLevel').style.backgroundColor = '#9FD2FE';
    document.getElementById('readingLevel').style.border = '2px solid black';

}

function getWordCount(text) {
    //takes string as input and returns number of words in the string
    wordArray = text.split(" ");
    console.log('wordCount: ', wordArray.length);
    return wordArray.length;
}

function syllables(word) {
    //takes one word string as input and returns number of syllables
    word = word.toLowerCase();
    word = word.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    //return word.match(/[aeiouy]{1,2}/g).length;   
    var syl = word.match(/[aeiouy]{1,2}/g);
    console.log('word syllables: ', syl);
    if (syl) {
        //console.log(syl);
        return syl.length;
    }
    else {
        return 0;
    }
}

function getSyllableCount(text) {
    //takes string as input and loop through each word, calling syllables function to calc syllables in each word. Returns total syllable count of text. 
    let syllableCount = 0;
    let textArray = text.split(" ");
    console.log(textArray);
    for (i = 0; i < textArray.length; i++) {
        syllableCount += syllables(textArray[i]);
        console.log('syllableCount at: ', syllableCount);
    }
    console.log('syllableCount: ', syllableCount.toString());
    return syllableCount;
}

function getSentenceCount(text) {
    //takes string as input and returns number of sentences in the string
    sentenceArray = text.split(',').join('').split('.').join(',').split('?').join(',').split('!').join(',').split(',');
    console.log('sentenceont - 1', sentenceArray.length - 1);
    return sentenceArray.length - 1;
}

/**
$('#saveDelta').click(function () {
    window.delta = quill.getContents(); // stores delta into window object so we can access it
});
*/

// quill.enable(false);  <<will disable the editing for user side presentation
var Ref = {};

Ref.refList = [];
Ref.refKeys = [];
Ref.usedRefs = [];

Ref.ReadRefFile = function(filename) {
    $.get(filename, function(data) {
        Ref.refList.push(bibtexParse.toJSON(data));
    });
}

Ref.FindRefKeys = function() {
    $('.post_container').children().each(function (i, e) {
        text = $(this).html();
        regExp = /refbib{[^{}]*}/g;
        matches = text.match(regExp);
        if (matches) {
            matches.forEach(function (ee) {
                text = ee.replace('refbib{', '').replace('}', '').split(',');
                Ref.refKeys.push(text);
            });
        }
    });
    Ref.refKeys = [...new Set(Ref.refKeys.flat())];
}

Ref.IndexBib = function() {
    $('.post_container').children().each(function (i, e) {
        text = $(this).html();
        regExp = /refbib{[^{}]*}/g;
        matches = text.match(regExp);
        if (matches) {
            matches.forEach(function (ee) {
                replacement = ee.replace('refbib{', '[').replace('}', ']').replace(',', ', ');
                refs = ee.replace('refbib{', '').replace('}', '').split(',');
                refs.forEach(function(eee) {
                    replacement = replacement.replace(eee, Ref.refKeys.indexOf(eee) + 1);
                });
                text = text.replace(ee, replacement);
                // Ref.refKeys.push(text);
            });
            console.log(Ref.refList);
            $(this).html(text);
        }
    });
}

Ref.Test = function() {
    this.ReadRefFile('references.bib');
    this.FindRefKeys();
    this.IndexBib();
    console.log(Ref.refKeys);
}
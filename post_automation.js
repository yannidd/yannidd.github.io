var indices = [];
var toc = "";
class FigureReference {
    constructor(ref, number) {
        this.ref = ref;
        this.number = number;
    }
}
class EquationReference {
    constructor(ref, number) {
        this.ref = ref;
        this.number = number;
    }
}
var figureReferences = [];
var equationReferences = [];

function indexHeadings() {
    // jQuery will give all the HNs in document order
    jQuery('h1,h2,h3,h4,h5,h6').each(function (i, e) {
        var hIndex = parseInt(this.nodeName.substring(1)) - 1;

        // just found a levelUp event
        if (indices.length - 1 > hIndex) {
            indices = indices.slice(0, hIndex + 1);
        }

        // just found a levelDown event
        if (indices[hIndex] == undefined) {
            indices[hIndex] = 0;
        }

        // count + 1 at current level
        indices[hIndex]++;

        // display the full position in the hierarchy
        jQuery(this).prepend(indices.join(".") + ". ");

        $(this).attr('section-idx', indices.join("."));
        $(this).attr('id', $(this).html().toLowerCase().replace(/\ /g, '_'));

    });
}

function indexFigures() {
    var figureIndex = 1;
    var sectionIndex = [1, 1];
    jQuery('figure').each(function (i, e) {
        sectionIndex[0] = sectionIndex[1];
        sectionIndex[1] = parseInt($(this).prevUntil('h1').prev().last().attr('section-idx'));

        if (sectionIndex[0] != sectionIndex[1]) {
            figureIndex = 1;
        }

        ref = $(this).attr('ref');
        number = sectionIndex[1] + '.' + figureIndex++;
        var figureReference = new FigureReference(ref, number);
        figureReferences.push(figureReference);

        caption = $(this).attr('caption');
        $(this).prepend('<strong>Figure ' + number + '.&nbsp;&nbsp;</strong>' + caption);
        $(this).attr('id', 'figure_' + number);

        source = $(this).attr('src');
        if (/png|jpg|eps|svg/g.test(source)) {
            $(this).prepend('<img src="' + source + '"><br>')
        }
        else if (/html/g.test(source)) {
            element = $(this);
            $.get( "images/plot.html", function( data ) {
                element.prepend(data);

            });
        }
    });
}

function indexEquations() {
    var equationIndex = 1;
    var sectionIndex = [1, 1];
    jQuery('equation').each(function (i, e) {
        sectionIndex[0] = sectionIndex[1];
        sectionIndex[1] = parseInt($(this).prevUntil('h1').prev().last().attr('section-idx'));

        if (sectionIndex[0] != sectionIndex[1]) {
            equationIndex = 1;
        }

        ref = $(this).attr('ref');
        number = sectionIndex[1] + '.' + equationIndex++;
        var equationReference = new EquationReference(ref, number);
        equationReferences.push(equationReference);

        caption = $(this).attr('caption');
        equation = $(this).html();
        replacement =   '<table style="width: 100%;"> \
                            <tr> \
                                <td style="width: 30pt;"></td> \
                                <td>' + equation +
                                '</td> \
                                <td style="width: 30pt; text-align: right;">(' + number + ')</td> \
                            </tr> \
                        </table>';

        $(this).html(replacement);
        $(this).attr('id', 'equation_' + number);
    });
    console.log(equationReferences);
}

function indexReferences() {
    function getNumber(ref) {
        retval = null;
        figureReferences.some(function (e) {
            if (e.ref == ref) {
                retval = e.number;
            }
        });
        if (retval) {
            return retval;
        }
        else {
            return '<b>ERROR: Reference not found!</b>';
        }
    }
    $('.post_container').children().each(function (i, e) {
        text = $(this).html();
        regExp = /reffig{[^{}]*}/g;
        matches = text.match(regExp);
        if (matches) {
            matches.forEach(function (ee) {
                ref = ee.replace('reffig{', '').replace('}', '');
                number = getNumber(ref)
                replacement = '<a href="#figure_' + number + '">Figure ' + number + '</a>';
                text = text.replace(ee, replacement);
            });
        }
        $(this).html(text);
    });
}

function makeToc() {
    toc = "<ul>";
    // jQuery will give all the HNs in document order
    jQuery('h1,h2,h3,h4,h5,h6').each(function (i, e) {
        indent = (parseInt($(this)[0].nodeName[1]) - 1) * 10;
        toc += '<li style="margin-left: ' + indent + 'px;"> \
                <a href="#' + $(this).attr('id') + '">'
            + this.innerHTML +
            "</a></li>";
    });
    toc += "</ul>";
    jQuery('.toc_container').append(toc);
}

jQuery(document).ready(function () {
    // window.location.reload(true);
    Ref.Test();
    indexHeadings();
    indexFigures();
    indexEquations();
    indexReferences();
    makeToc();
});
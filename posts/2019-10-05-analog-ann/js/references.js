// Read references.bib and create references section
// -----------------------------------------------------------------------------
$.get('bib/references.bib', function (data) {
  var references = bibtexParse.toJSON(data);
  references_div = $('.references');
  var entry_list = '<ol>';
  $.each(references, function (index, value) {
    entry_list += '<li id="rf-' + value.citationKey + '">';
    
    entry_list += '<span class="title">';
    entry_list += value.entryTags.TITLE;
    entry_list += '</span>';
    
    url = value.entryTags.URL;
    doi = value.entryTags.DOI;
    if (url) {
      entry_list += '<a target="_blank" href="' + url + '">[online]</a>';
    }
    else if (doi) {
      entry_list += '<a target="_blank" href="https://doi.org/' + doi + '">[online]</a>';
    }
    
    entry_list += '<br>';
    
    tags = [];
    
    author = value.entryTags.AUTHOR;
    year = value.entryTags.YEAR;
    publisher = value.entryTags.PUBLISHER;
    pages = value.entryTags.PAGES;
    
    if (author) {
      tags.push(author);
    }
    if (year) {
      tags.push(year);
    }
    if (publisher) {
      tags.push(publisher);
    }
    if (pages) {
      tags.push('pp. ' + pages);
    }
    
    entry_list += tags.join(', ');
    
    entry_list += '</li>';
  });
  entry_list += '</ol>';
  console.log(entry_list);
  references_div.html(entry_list);

  References.setup();
}, 'text');

// Resolve citations
// -----------------------------------------------------------------------------
var References = {
  referencetimeout: false,
  setup: function () {
    var referencelinks = $("a[href^='#rf-']");

    referencelinks.each(function (index) {
      var id = $(this).attr('href');
      var reference = $(id);
      var reference_id = $('.references ol li').index(reference);
      console.log(reference);
      if (reference_id == -1) {
        $(this).text('ERROR');
      }
      else {
        $(this).html('[' + (reference_id + 1) + ']');
      }
    });
    
    referencelinks.unbind('mouseover', References.referenceover);
    referencelinks.unbind('mouseout', References.referenceoout);
    
    referencelinks.bind('mouseover', References.referenceover);
    referencelinks.bind('mouseout', References.referenceoout);
  },
  referenceover: function () {
    clearTimeout(References.referencetimeout);
    $('#referencediv').stop();
    $('#referencediv').remove();
    
    var id = $(this).attr('href');
    var position = $(this).offset();
    
    var div = $(document.createElement('div'));
    div.attr('id', 'referencediv');
    div.bind('mouseover', References.divover);
    div.bind('mouseout', References.referenceoout);
    
    var reference = $(id);
    console.log(id);
    console.log(reference.html());
    div.html(reference.html());

    div.css({
      position: 'absolute',
      width: '400px',
      opacity: 0.95,
    });
    $(document.body).append(div);

    var left = position.left;
    if (left + 420 > $(window).width() + $(window).scrollLeft())
      left = $(window).width() - 420 + $(window).scrollLeft();
    var top = position.top + 20;
    if (top + div.height() > $(window).height() + $(window).scrollTop())
      top = position.top - div.height() - 15;
    div.css({
      left: left,
      top: top
    });
  },
  referenceoout: function () {
    References.referencetimeout = setTimeout(function () {
      $('#referencediv').animate({
        opacity: 0
      }, 600, function () {
        $('#referencediv').remove();
      });
    }, 100);
  },
  divover: function () {
    clearTimeout(References.referencetimeout);
    $('#referencediv').stop();
    $('#referencediv').css({
      opacity: 0.9
    });
  }
}
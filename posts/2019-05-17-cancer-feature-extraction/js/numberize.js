// <reference path="../node_modules/@types/jquery/index.d.ts" />

// Go through all h2 tags.
$('h2').each(function(h2_index) {
  var label = (h2_index + 1) + '. ';
  var text = $(this).html();
  // Add index to h2 elements.
  $(this).prepend(label);
  $(this).attr('label', label.trim());
  $(this).attr('text', text);
  
  // Go through all h3 tags between two h2 tags.
  $(this).nextUntil('h2', 'h3').each(function(h3_index) {
    var label = (h2_index + 1) + '.' + (h3_index + 1) + '. ';
    var text = $(this).html();
    // Add index to h3 elements.
    $(this).prepend(label);
    $(this).attr('label', label.trim());
    $(this).attr('text', text);
    
    // Go through all h4 tags between two h3 tags.
    $(this).nextUntil('h3', 'h4').each(function(h4_index) {
      var label = (h2_index + 1) + '.' + (h3_index + 1) + '.' + (h4_index + 1) + '. ';
      var text = $(this).html();
      // Add index to h4 elements.
      $(this).prepend(label);
      $(this).attr('label', label.trim());
      $(this).attr('text', text);
    });
  });
  
  // Go through all figure tags between two h2 tags.
  $(this).nextUntil('h2', 'figure').each(function(figure_index) {
    var label = (h2_index + 1) + '.' + (figure_index + 1) + '.  ';
    var text = $(this).html();
    // Add index to figcaption elements.
    $(this).children('figcaption').prepend('Figure ' + label);
    console.log($(this).attr('id'));
    $(this).attr('label', label.trim().slice(0,-1));
    $(this).attr('text', text);
  });

  // Go through all \tag{} between two h2 tags.
  var equation_index = 0;
  $(this).nextUntil('h2', 'p').each(function(figure_index) {
    var text = $(this).html();
    
    for (var i = 0; i < 100; i++) {
      var new_text = text.replace('\\tag{}', '\\tag{' + (h2_index + 1) + '.' + (++equation_index) + '}');
      if (new_text != text) {
        text = new_text;
      }
      else {
        --equation_index;
        $(this).html(text);
        break;
      }
    }
  });
});

// Resolve all figure citations
// -----------------------------------------------------------------------------
var figurelinks = $("a[href^='#fg-']");
figurelinks.each(function (index) {
  var id = $(this).attr('href');
  var figure = $(id);
  var figure_id = figure.attr('label');
  console.log($('#fg-neuron').attr('id'));

  if (figure_id == -1) {
    $(this).text('ERROR');
  }
  else {
    $(this).html(figure_id);
  }
});

// 
// -----------------------------------------------------------------------------
// Find all leaf nodes inside the article tag.
$('article').find('*:not(:has(*))').each(function() {
  var text = $(this).html();

  // Check if the node has '\refeqn{...}'.
  var matches = text.match(/\\refeqn{.+}/);
  if (matches) {
    // Go through each match.
    $.each(matches, function(index, value) {
      // Find the reference and its label.
      var ref_id = '#mjx-eqn-' + value.replace('\\refeqn{', '').replace('}', '');
      var label = $(ref_id).html();
      console.log(ref_id);
      console.log(label);

      // Replace with label if reference exists, replace with error otherwise.
      if (label) {
        text = text.replace(value, label);
      }
      else {
        text = text.replace(value, 
          '<span style="color: red;"> \
            ERROR: Undefined reference ' + ref_id +
          '</span>');
      }
    });

    // Update with the new text;
    $(this).html(text);
  }
});
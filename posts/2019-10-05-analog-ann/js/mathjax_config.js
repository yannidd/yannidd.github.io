window.MathJax = {
  tex: {
    inlineMath: [['$', '$']]
  },
  chtml: {
    // global scaling factor for all expressions
    scale: 1,
    // smallest scaling factor to use
    minScale: .5,
    // true to match ex-height of surrounding font
    matchFontHeight: true,
    // true to make mtext elements use surrounding font
    mtextInheritFont: true,
    // true to make merror text use surrounding font
    merrorInheritFont: true,
    // true for MathML spacing rules, false for TeX rules
    mathmlSpacing: false,
    // RFDa and other attributes NOT to copy to the output
    skipAttributes: {},
    // default size of ex in em units
    exFactor: .5,
    // default for indentalign when set to 'auto'
    displayAlign: 'center',
    // default for indentshift when set to 'auto'
    displayIndent: '0'
  },
  svg: {
    fontCache: 'global'
  }
};
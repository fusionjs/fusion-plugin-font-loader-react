export const fallbackLookup = {
  depth0: {},
  depth1: {
    'ClanPro-News': {
      name: 'ClanPro-Book',
      styles: {'font-weight': 'bold'},
    },
    'ClanPro-Thin': {
      name: 'ClanPro-Book',
      styles: {'font-weight': '100'},
    },
  },
  depth2: {
    'ClanPro-Book': {
      name: 'Helvetica',
    },
    'ClanPro-News': {
      name: 'Helvetica',
    },
    'ClanPro-Thin': {
      name: 'Helvetica',
    },
  },
};

export const fontFaces =
  '\n@font-face {font-family: "ClanPro-Book"; src: url("/_static/Clan-Book.woff") format("woff")\n,url("/_static/Clan-Book.woff2") format("woff2")\n;}\n@font-face {font-family: "ClanPro-News"; src: url("/_static/Clan-News.woff") format("woff")\n,url("/_static/Clan-News.woff2") format("woff2")\n;}\n@font-face {font-family: "ClanPro-Thin"; src: url("/_static/Clan-Thin.woff") format("woff")\n,url("/_static/Clan-Thin.woff2") format("woff2")\n;}';

export const preloadLinks =
  '\n<link rel="font" href="/_static/Clan-Book.woff2" as="font" type="font/woff2" crossorigin>';

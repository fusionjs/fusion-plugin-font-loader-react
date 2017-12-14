export const preloadDepth = 1;
export const fonts = {
  'ClanPro-Book': {
    urls: {
      woff: 'Clan-Book.woff',
      woff2: 'Clan-Book.woff2',
    },
    fallback: {
      name: 'Helvetica',
    },
  },
  'ClanPro-News': {
    urls: {
      woff: 'Clan-News.woff',
      woff2: 'Clan-News.woff2',
    },
    fallback: {
      name: 'ClanPro-Book',
      styles: {
        'font-weight': 'bold',
      },
    },
  },
  'ClanPro-Thin': {
    urls: {
      woff: 'Clan-Thin.woff',
      woff2: 'Clan-Thin.woff2',
    },
    fallback: {
      name: 'ClanPro-Book',
      styles: {
        'font-weight': '100',
      },
    },
  },
};

import tape from 'tape-cup';

import App from 'fusion-core';
import {getSimulator} from 'fusion-test-utils';

import {
  fonts as mockFonts,
  preloadDepth as mockPreloadDepth,
} from './fixtures/static/font-config';

import {FontPlugin as FontLoaderReactPlugin} from '../index';
import {FontLoaderReactToken, FontLoaderReactConfigToken} from '../tokens';

tape('plugin - middleware modifies head as expected', t => {
  const mockConfig = {
    fonts: mockFonts,
    preloadDepth: mockPreloadDepth,
  };

  const app = new App('content', el => el);
  app.middleware(async (ctx, next) => {
    await next();
    t.true(ctx.body.head.length > 0, 'head was modified by plugin');
  });
  app.register(FontLoaderReactToken, FontLoaderReactPlugin);
  app.register(FontLoaderReactConfigToken, mockConfig);
  app.middleware((ctx, next) => {
    ctx.body = {
      head: [],
    };
    return next();
  });

  getSimulator(app).render('/');

  t.end();
});

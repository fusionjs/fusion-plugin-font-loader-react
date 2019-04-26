/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import tape from 'tape-cup';

import App, {consumeSanitizedHTML} from 'fusion-core';

import {getSimulator} from 'fusion-test-utils';

import {getFontConfig} from './fixtures/static/font-config';

import FontLoaderReactPlugin from '../index';
import {FontLoaderReactToken, FontLoaderReactConfigToken} from '../tokens';

import {
  atomicFontFaces as expectedAtomicFontFaces,
  styledFontFaces as expectedStyledFontFaces,
} from './fixtures/expected';

tape('exported as expected', t => {
  t.ok(FontLoaderReactPlugin, 'plugin defined as expected');
  t.equal(typeof FontLoaderReactPlugin, 'object', 'plugin is an object');
  t.end();
});

const atomicConfig = getFontConfig(false);
testFontLoader(atomicConfig, testAtomicFontFace);
const styledConfig = getFontConfig(true);
testFontLoader(styledConfig, testStyledFontFace);

function testFontLoader(config, styleHeaderTest) {
  tape('plugin - middleware adds atomic font faces', t => {
    const app = new App('content', el => el);
    app.middleware(async (ctx, next) => {
      await next();
      const headerElement = ctx.template.head.reduce(
        (result, e) => ((result += consumeSanitizedHTML(e)), result),
        ''
      );
      styleHeaderTest(t, headerElement);
    });
    app.register(FontLoaderReactToken, FontLoaderReactPlugin);
    app.register(FontLoaderReactConfigToken, config);
    app.middleware((ctx, next) => {
      ctx.body = {
        head: [],
      };
      return next();
    });
    getSimulator(app).render('/');
    t.end();
  });
}

function testAtomicFontFace(t, headerElement) {
  equalWithoutSpaces(
    t,
    headerElement,
    `<style>${expectedAtomicFontFaces}</style>`,
    'atomic font face added by plugin'
  );
}

function testStyledFontFace(t, headerElement) {
  equalWithoutSpaces(
    t,
    headerElement,
    `<style>${expectedStyledFontFaces}</style>`,
    'atomic font face added by plugin'
  );
}

function equalWithoutSpaces(t, str1, str2) {
  t.equal(str1.replace(/\s/g, ''), str2.replace(/\s/g, ''));
}

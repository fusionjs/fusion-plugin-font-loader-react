/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import tape from 'tape-cup';

import {getFontConfig} from './fixtures/static/font-config';
import {
  fallbackLookup as expectedFallbackLookup,
  fontFaces as expectedFontFaces,
  preloadLinks as expectedPreloadLinks,
} from './fixtures/expected';

import generateFallbackMap from '../generate-fallback-map';
import {
  generateAtomicFontFaces,
  generateStyledFontFaces,
} from '../generate-font-faces';
import type {AtomicFontsObjectType, StyledFontsObjectType} from '../types';
import generatePreloadLinks from '../generate-preload-links';

tape('generateFallbackMap', t => {
  const atomicFonts: AtomicFontsObjectType = (getFontConfig(false).fonts: any);
  t.equal(
    typeof generateFallbackMap,
    'function',
    'exports a generateFallbackMap function'
  );
  t.deepEqual(
    generateFallbackMap(atomicFonts, 0),
    expectedFallbackLookup.depth0
  );
  t.deepEqual(
    generateFallbackMap(atomicFonts, 1),
    expectedFallbackLookup.depth1
  );
  t.deepEqual(
    generateFallbackMap(atomicFonts, 2),
    expectedFallbackLookup.depth2
  );
  t.end();
});

tape('generateAtomicFontFaces', t => {
  const atomicFonts: AtomicFontsObjectType = (getFontConfig(false).fonts: any);
  t.equal(
    typeof generateAtomicFontFaces,
    'function',
    'exports a generateFontFaces function'
  );
  equalWithoutSpaces(
    t,
    generateAtomicFontFaces(atomicFonts),
    expectedFontFaces
  );
  t.end();
});

tape('generatePreloadLinks', t => {
  const atomicFonts: AtomicFontsObjectType = (getFontConfig(false).fonts: any);
  t.equal(
    typeof generatePreloadLinks,
    'function',
    'exports a generatePreloadLinks function'
  );
  t.equal(
    generatePreloadLinks({'Lato-Regular': true}, atomicFonts),
    expectedPreloadLinks
  );
  t.end();
});

function equalWithoutSpaces(t, str1, str2) {
  t.equal(str1.replace(/\s/g, ''), str2.replace(/\s/g, ''));
}

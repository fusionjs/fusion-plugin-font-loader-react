/** Copyright (c) 2019 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {AtomicFontsObjectType, StyledFontsObjectType} from './types';

export function generateAtomicFontFaces(fonts: AtomicFontsObjectType) {
  const faces = [];
  Object.keys(fonts).forEach(fontName => {
    const font = fonts[fontName];
    if (font) {
      faces.push(
        `@font-face {
          font-family: "${fontName}";
          font-display: fallback;
          src: ${String(asFontFaceSrc(font.urls))};
          ${String(asFontFaceStyles(font.styles || {}))}`
      );
    }
  });
  return '\n' + faces.join('\n');
}

export function generateStyledFontFaces(fonts: StyledFontsObjectType) {
  const faces = [];
  Object.keys(fonts).forEach(fontName => {
    fonts[fontName].forEach(fontInstance => {
      faces.push(
        `@font-face {font-family: "${fontName}"; font-display: fallback; src: ${String(
          asFontFaceSrc(fontInstance.urls)
        )};}`
      );
    });
  });
  return '\n' + faces.join('\n');
}

function asFontFaceSrc(urls) {
  // `urls` is a dictionary of font types (woff, woff2 etc) to url string
  return Object.keys(urls).map(
    type => `url("${urls[type]}") format("${type}")\n`
  );
}

function asFontFaceStyles(styles) {
  return Object.keys(styles).map(key => `${key}: styles[key];\n`);
}

/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/* eslint-env node */

import React from 'react';

import {createPlugin, html, dangerouslySetHTML} from 'fusion-core';

import FontProvider from './provider';
import PreloadSession from './preload-session';
import generateFallbackMap from './generate-fallback-map';
import generatePreloadLinks from './generate-preload-links';
import {
  generateAtomicFontFaces,
  generateStyledFontFaces,
} from './generate-font-faces';
import {FontLoaderReactConfigToken as ConfigToken} from './tokens';
import type {
  PluginType,
  AtomicFontsObjectType,
  StyledFontsObjectType,
} from './types.js';

const plugin = createPlugin({
  deps: {
    config: ConfigToken,
  },
  middleware: ({config}) => {
    const {fonts, preloadDepth, withStyleOverloads} = config;
    const atomicFonts: AtomicFontsObjectType = (fonts: any);
    const fallbackLookup = generateFallbackMap(atomicFonts, preloadDepth || 0);
    const preloadSession = new PreloadSession(fallbackLookup);

    return (ctx, next) => {
      if (ctx.element) {
        if (!withStyleOverloads) {
          ctx.element = (
            <FontProvider getFontDetails={preloadSession.getFontDetails}>
              {ctx.element}
            </FontProvider>
          );
        }
        return next().then(() => {
          if (__NODE__) {
            ctx.template.head.push(html`<style>`);
            if (withStyleOverloads) {
              const styledFonts: StyledFontsObjectType = (fonts: any);
              ctx.template.head.push(
                dangerouslySetHTML(generateStyledFontFaces(styledFonts))
              );
            } else {
              const atomicFonts: AtomicFontsObjectType = (fonts: any);
              ctx.template.head.push(
                dangerouslySetHTML(generateAtomicFontFaces(atomicFonts))
              );
            }
            ctx.template.head.push(html`</style>`);
            if (!withStyleOverloads) {
              const atomicFonts: AtomicFontsObjectType = (fonts: any);
              ctx.template.head.push(
                dangerouslySetHTML(
                  generatePreloadLinks(
                    preloadSession.fontsToPreload,
                    atomicFonts
                  )
                )
              );
            }
          }
        });
      } else {
        return next();
      }
    };
  },
});
export default (plugin: PluginType);

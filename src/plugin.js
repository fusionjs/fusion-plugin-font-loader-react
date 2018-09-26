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
import PreloadEngine from './preload-engine';
import generateFallbackMap from './generate-fallback-map';
import generatePreloadLinks from './generate-preload-links';
import generateFontFaces from './generate-font-faces';
import {FontLoaderReactConfigToken as ConfigToken} from './tokens';
import type {PluginType} from './types.js';

const plugin = createPlugin({
  deps: {
    config: ConfigToken,
  },
  middleware: ({config}) => {
    const {fonts, preloadDepth} = config;
    const fallbackLookup = generateFallbackMap(fonts, preloadDepth);
    const preloadEngine = new PreloadEngine(fallbackLookup);

    return (ctx, next) => {
      if (ctx.element) {
        ctx.element = (
          <FontProvider getFontDetails={preloadEngine.getFontDetails}>
            {ctx.element}
          </FontProvider>
        );
        return next().then(() => {
          if (__NODE__) {
            ctx.template.head.push(html`<style>`);
            ctx.template.head.push(
              dangerouslySetHTML(generateFontFaces(fonts))
            );
            ctx.template.head.push(html`</style>`);
            ctx.template.head.push(
              dangerouslySetHTML(
                generatePreloadLinks(preloadEngine.fontsToPreload, fonts)
              )
            );
          }
        });
      } else {
        return next();
      }
    };
  },
});
export default (plugin: PluginType);

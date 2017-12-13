export default function generateFontFaces(fontDictionary) {
  const faces = [];
  Object.keys(fontDictionary).forEach(fontName => {
    const font = fontDictionary[fontName];
    if (font) {
      faces.push(
        `@font-face {font-family: "${fontName}"; src: ${asFontFaceSrc(
          font.url
        )};}`
      );
    }
  });
  return '\n' + faces.join('\n');
}

function asFontFaceSrc(url) {
  return Object.keys(url).map(
    type => `url("/_static/${url[type]}") format("${type}")\n`
  );
}

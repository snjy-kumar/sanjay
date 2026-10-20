import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// Share cards are rasterised at build time with the same typeface the site
// uses, so the card and the page look like one design. The fonts live in the
// repo (SIL OFL) and are only read while building — they are never served.
const fontDir = path.resolve(process.cwd(), 'src/fonts');

export interface OgCard {
  title: string;
  kicker: string;
  meta: string;
  footer: string;
}

let fontCache: Promise<
  { name: string; data: Buffer; weight: 400 | 600; style: 'normal' }[]
> | null = null;

function loadFonts() {
  if (!fontCache) {
    fontCache = Promise.all([
      readFile(path.join(fontDir, 'IBMPlexSans-Regular.ttf')),
      readFile(path.join(fontDir, 'IBMPlexSans-SemiBold.ttf')),
      readFile(path.join(fontDir, 'IBMPlexMono-Regular.ttf')),
    ]).then(([regular, semiBold, mono]) => [
      { name: 'IBM Plex Sans', data: regular, weight: 400 as const, style: 'normal' as const },
      { name: 'IBM Plex Sans', data: semiBold, weight: 600 as const, style: 'normal' as const },
      { name: 'IBM Plex Mono', data: mono, weight: 400 as const, style: 'normal' as const },
    ]);
  }
  return fontCache;
}

export async function renderOgCard(card: OgCard): Promise<Uint8Array> {
  const fonts = await loadFonts();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: 1200,
          height: 630,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          padding: '80px 88px',
          fontFamily: 'IBM Plex Sans',
          color: '#111111',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'IBM Plex Mono',
                fontSize: 26,
                color: '#8a8a8a',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              },
              children: [
                { type: 'div', props: { children: card.kicker } },
                { type: 'div', props: { children: card.meta } },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: card.title.length > 42 ? 60 : 72,
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: 980,
              },
              children: card.title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #d9d9d9',
                paddingTop: 32,
                fontSize: 28,
                color: '#5e5e5e',
              },
              children: [
                { type: 'div', props: { children: card.footer } },
                {
                  type: 'div',
                  props: {
                    style: { width: 20, height: 20, backgroundColor: '#111111' },
                    children: '',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    { width: 1200, height: 630, fonts },
  );

  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}

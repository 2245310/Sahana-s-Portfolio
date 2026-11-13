import sSvgRaw from '../../Logo/individual.letter/s.svg?raw';
import a1SvgRaw from '../../Logo/individual.letter/a.svg?raw';
import hSvgRaw from '../../Logo/individual.letter/h.svg?raw';
import a2SvgRaw from '../../Logo/individual.letter/a2.svg?raw';
import nSvgRaw from '../../Logo/individual.letter/n.svg?raw';
import a3SvgRaw from '../../Logo/individual.letter/a3.svg?raw';

import hoverSImg from '../../Images/hover 2.jpeg';
import hoverA1Img from '../../Images/hover.a1.jpeg';
import hoverHImg from '../../Images/hover.jpeg';
import hoverA2Img from '../../Images/hover.a2.jpeg';
import hoverNImg from '../../Images/hover.n.jpeg';
import hoverA3Img from '../../Images/hover.a3.jpeg';

function extractPaths(svgRaw) {
  const matches = [...svgRaw.matchAll(/\bd="([^"]+)"/g)];
  return matches.map((m) => m[1]);
}

// Normalized widths & kerning gaps summing to 100% of the centered hero inner container
export const HERO_LETTERS = [
  {
    id: 's',
    char: 'S',
    paths: extractPaths(sSvgRaw),
    viewBox: '532 335.5 401.4 565.7',
    widthPct: 16.2274,
    gapAfterPct: 1.4172,
    hoverImage: hoverSImg,
    hoverText: 'full-time stray animal magnet',
  },
  {
    id: 'a1',
    char: 'a',
    paths: extractPaths(a1SvgRaw),
    viewBox: '573.5 410.5 318.4 415.6',
    widthPct: 12.838,
    gapAfterPct: 1.4172,
    hoverImage: hoverA1Img,
    hoverText: 'spaghetti runs through my veins',
  },
  {
    id: 'h',
    char: 'h',
    paths: extractPaths(hSvgRaw),
    viewBox: '482.6 346.2 500.1 544.3',
    widthPct: 20.2617,
    gapAfterPct: 0.3553,
    hoverImage: hoverHImg,
    hoverText: 'like to move, to justify the pasta',
  },
  {
    id: 'a2',
    char: 'a',
    paths: extractPaths(a2SvgRaw),
    viewBox: '573.5 410.5 318.4 415.6',
    widthPct: 12.838,
    gapAfterPct: 1.4172,
    hoverImage: hoverA2Img,
    hoverText: 'I’m always fighting with a bobbin',
  },
  {
    id: 'n',
    char: 'n',
    paths: extractPaths(nSvgRaw),
    viewBox: '485.4 410.5 494.6 415.6',
    widthPct: 20.035,
    gapAfterPct: 0.3553,
    hoverImage: hoverNImg,
    hoverText: "basically Lane Kim's taste in music",
  },
  {
    id: 'a3',
    char: 'a',
    paths: extractPaths(a3SvgRaw),
    viewBox: '573.5 410.5 318.4 415.6',
    widthPct: 12.8376,
    gapAfterPct: 0,
    hoverImage: hoverA3Img,
    hoverText: 'Serial maker of things',
  },
];

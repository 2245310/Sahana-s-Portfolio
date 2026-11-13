import project01Img from '../../Images/project-01.png';
import project02Img from '../../Images/project-02.png';
import project03Img from '../../Images/project-03.png';
import project04Img from '../../Images/project-04.png';
import project05Img from '../../Images/project-05.png';
import project06Img from '../../Images/project-06.png';

import motif1Raw from '../../Logo/motifs/motif-1.svg?raw';
import motif2Raw from '../../Logo/motifs/motif-2.svg?raw';
import motif3Raw from '../../Logo/motifs/motif-3.svg?raw';
import motif4Raw from '../../Logo/motifs/motif-4.svg?raw';

function extractPath(svgRaw) {
  const match = svgRaw.match(/\bd="([^"]+)"/);
  return match ? match[1] : '';
}

export const PROJECTS = [
  {
    id: 'project-01',
    title: 'Project 1',
    image: project01Img,
    // 1st to emerge (left of centre)
    timing: {
      emergeStart: 0.0,
      emergeEnd: 0.2,
      settleStart: 0.42,
      settleEnd: 0.78,
    },
    start3D: {
      xPercent: 10,
      yPercent: 12,
      z: -720,
      scale: 0.38,
      rotateX: 22,
      rotateY: 26,
      rotateZ: -8,
    },
    scatter3D: {
      xPercent: 6,
      yPercent: 7,
      z: -420,
      scale: 0.56,
      rotateX: 15,
      rotateY: 18,
      rotateZ: -5,
    },
  },
  {
    id: 'project-02',
    title: 'Project 2',
    image: project02Img,
    // 4th to emerge (top-centre)
    timing: {
      emergeStart: 0.2,
      emergeEnd: 0.38,
      settleStart: 0.52,
      settleEnd: 0.85,
    },
    start3D: {
      xPercent: -4,
      yPercent: 14,
      z: -840,
      scale: 0.34,
      rotateX: -20,
      rotateY: 16,
      rotateZ: 6,
    },
    scatter3D: {
      xPercent: -3,
      yPercent: 8,
      z: -480,
      scale: 0.52,
      rotateX: -14,
      rotateY: 12,
      rotateZ: 4,
    },
  },
  {
    id: 'project-03',
    title: 'Project 3',
    image: project03Img,
    // 2nd to emerge (right of centre)
    timing: {
      emergeStart: 0.06,
      emergeEnd: 0.26,
      settleStart: 0.45,
      settleEnd: 0.8,
    },
    start3D: {
      xPercent: -10,
      yPercent: 14,
      z: -680,
      scale: 0.4,
      rotateX: 19,
      rotateY: -28,
      rotateZ: 7,
    },
    scatter3D: {
      xPercent: -6,
      yPercent: 8,
      z: -390,
      scale: 0.58,
      rotateX: 13,
      rotateY: -19,
      rotateZ: 5,
    },
  },
  {
    id: 'project-04',
    title: 'Project 4',
    image: project04Img,
    // 3rd to emerge (bottom-left)
    timing: {
      emergeStart: 0.13,
      emergeEnd: 0.32,
      settleStart: 0.48,
      settleEnd: 0.83,
    },
    start3D: {
      xPercent: 9,
      yPercent: -12,
      z: -780,
      scale: 0.36,
      rotateX: -18,
      rotateY: 24,
      rotateZ: 7,
    },
    scatter3D: {
      xPercent: 5,
      yPercent: -7,
      z: -450,
      scale: 0.54,
      rotateX: -12,
      rotateY: 16,
      rotateZ: 4,
    },
  },
  {
    id: 'project-05',
    title: 'Project 5',
    image: project05Img,
    // 6th to emerge (bottom-centre)
    timing: {
      emergeStart: 0.33,
      emergeEnd: 0.5,
      settleStart: 0.6,
      settleEnd: 0.9,
    },
    start3D: {
      xPercent: 4,
      yPercent: -14,
      z: -880,
      scale: 0.33,
      rotateX: 21,
      rotateY: -15,
      rotateZ: -6,
    },
    scatter3D: {
      xPercent: 3,
      yPercent: -8,
      z: -510,
      scale: 0.5,
      rotateX: 14,
      rotateY: -10,
      rotateZ: -4,
    },
  },
  {
    id: 'project-06',
    title: 'Project 6',
    image: project06Img,
    // 5th to emerge (bottom-right)
    timing: {
      emergeStart: 0.27,
      emergeEnd: 0.44,
      settleStart: 0.56,
      settleEnd: 0.88,
    },
    start3D: {
      xPercent: -9,
      yPercent: -11,
      z: -760,
      scale: 0.37,
      rotateX: -22,
      rotateY: -24,
      rotateZ: -8,
    },
    scatter3D: {
      xPercent: -5,
      yPercent: -6,
      z: -430,
      scale: 0.55,
      rotateX: -15,
      rotateY: -16,
      rotateZ: -5,
    },
  },
];

// Four stationary foreground motifs positioned across the horizontal center divider
// matching references/projects.page.png
export const FOREGROUND_MOTIFS = [
  {
    id: 'motif-left',
    viewBox: '44.76 68.75 1375.89 1099.13',
    rectFill: 'var(--color-ivory)',
    pathFill: 'var(--color-black)',
    pathD: extractPath(motif4Raw),
    className: 'project-motif motif-left',
  },
  {
    id: 'motif-center-left',
    viewBox: '44.76 68.75 1375.89 1099.13',
    rectFill: 'var(--color-green)',
    pathFill: 'var(--color-ivory)',
    pathD: extractPath(motif1Raw),
    className: 'project-motif motif-center-left',
  },
  {
    id: 'motif-center-right',
    viewBox: '44.76 68.75 1375.89 1099.13',
    rectFill: 'var(--color-black)',
    pathFill: 'var(--color-orange)',
    pathD: extractPath(motif3Raw),
    className: 'project-motif motif-center-right',
  },
  {
    id: 'motif-right',
    viewBox: '44.76 68.75 1375.89 1099.13',
    rectFill: 'var(--color-orange)',
    pathFill: 'var(--color-green)',
    pathD: extractPath(motif2Raw),
    className: 'project-motif motif-right',
  },
];

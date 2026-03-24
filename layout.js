/* ═══════════════════════════════════════════════════════════════
   GALERÍAS (Diagonales laterales)
   ═══════════════════════════════════════════════════════════════ */
const GALERIA_PAR = [];

// 1. Añadimos manualmente las dos primeras butacas PMR (serie 9000)
GALERIA_PAR.push({ n: 9102, s: 'P', section: 'gal-par', pmr: true });
GALERIA_PAR.push({ n: 9104, s: 'P', section: 'gal-par', pmr: true });

// 2. El bucle ahora empieza en el 6 y termina en el 50 (2 interacciones menos)
for (let i = 2; i <= 50; i += 2) {
  GALERIA_PAR.push({ n: i, s: 'P', section: 'gal-par' });
}


const GALERIA_IMP = [];

// 1. Añadimos manualmente las dos primeras butacas PMR (serie 9000)
GALERIA_IMP.push({ n: 9101, s: 'I', section: 'gal-imp', pmr: true });
GALERIA_IMP.push({ n: 9103, s: 'I', section: 'gal-imp', pmr: true });

// 2. El bucle ahora empieza en el 5 y termina en el 49 (2 interacciones menos)
for (let i = 1; i <= 49; i += 2) {
  GALERIA_IMP.push({ n: i, s: 'I', section: 'gal-imp' });
}

/* ═══════════════════════════════════════════════════════════════
   ANFITEATRO 2° — 12 filas (La sección más alta)
   ═══════════════════════════════════════════════════════════════ */
const ANF2_DATA = {
  1:  { cp: [14,12,10,8,6,4,2], lp: [40,38,36,34,32,30,28,26,24,22,20,18,16] },
  2:  { cp: [14,12,10,8,6,4,2], lp: [38,36,34,32,30,28,26,24,22,20,18,16] },
  3:  { cp: [14,12,10,8,6,4,2], lp: [36,34,32,30,28,26,24,22,20,18,16] },
  4:  { cp: [14,12,10,8,6,4,2], lp: [34,32,30,28,26,24,22,20,18,16] },
  5:  { cp: [14,12,10,8,6,4,2], lp: [32,30,28,26,24,22,20,18,16] },
  6:  { cp: [14,12,10,8,6,4,2], lp: [30,28,26,24,22,20,18,16] },
  7:  { cp: [14,12,10,8,6,4,2], lp: [28,26,24,22,20,18,16] },
  8:  { cp: [14,12,10,8,6,4,2], lp: [26,24,22,20,18,16] },
  9:  { cp: [14,12,10,8,6,4,2], lp: [24,22,20,18,16] },
  10: { cp: [14,12,10,8,6,4,2], lp: [] },
  11: { cp: [22,20,18,16,14,12,10,8,6,4,2], lp: [] },
  12: { cp: [20,18,16,14,12,10,8,6,4,2], lp: [] }
};

function makeANF2row(rowNum) {
  const data = ANF2_DATA[rowNum];
  if (!data) return { zone: 'anf2', row: rowNum, seats: [] };
  const { cp, lp } = data;
  const seats = [];

  // Par — Orden: LatPar, Pasillo, CenPar
  if (lp.length > 0) {
    lp.forEach(n => seats.push({ n, s: 'P', section: 'lat-par' }));
    seats.push({ aisle: true, label: rowNum });
  }
  if (cp.length > 0) {
    cp.forEach(n => seats.push({ n, s: 'P', section: 'cen-par' }));
  }
  seats.push({ aisle: true }); // Pasillo central

  // Impar — Orden: CenImp, Pasillo, LatImp
  if (cp.length > 0) {
    [...cp].reverse().forEach(n => seats.push({ n: n - 1, s: 'I', section: 'cen-imp' }));
    if (lp.length > 0) seats.push({ aisle: true, label: rowNum });
  }
  if (lp.length > 0) {
    [...lp].reverse().forEach(n => seats.push({ n: n - 1, s: 'I', section: 'lat-imp' }));
  }

  return { zone: 'anf2', row: rowNum, seats };
}

/* ═══════════════════════════════════════════════════════════════
   ANFITEATRO 1° — 15 filas (Sección intermedia con el Palco)
   ═══════════════════════════════════════════════════════════════ */
const ANF1_DATA = {
  1:  { cp: [],                li: [],         le: [14,12,10,8,6,4,2] },
  2:  { cp: [],                li: [],         le: [14,12,10,8,6,4,2] },
  3:  { cp: [],                li: [14,12,10,8,6,4,2],le: [28,26,24,22,20,18,16] },
  4:  { cp: [],                li: [14,12,10,8,6,4,2],le: [28,26,24,22,20,18,16] },
  5:  { cp: [],                li: [26,24,22,20,18,16,14,12,10,8,6,4,2],le: [40,38,36,34,32,30,28] },
  6:  { cp: [14,12,10,8,6,4,2],    li: [40,38,36,34,32,30,28,26,24,22,20,18,16,],        le: [54,52,50,48,46,44,42] },
  7:  { cp: [16,14,12,10,8,6,4,2], li: [42,40,38,36,34,32,30,28,26,24,22,20,18],        le: [56,54,52,50,48,46,44] },
  8:  { cp: [16,14,12,10,8,6,4,2], li: [42,40,38,36,34,32,30,28,26,24,22,20,18],        le: [56,54,52,50,48,46,44] },
  9:  { cp: [18,16,14,12,10,8,6,4,2], li: [44,42,40,38,36,34,32,30,28,26,24,22,20],  le: [58,56,54,52,50,48,46] },
  10: { cp: [18,16,14,12,10,8,6,4,2], li: [42,40,38,36,34,32,30,28,26,24,22,20],  le: [56,54,52,50,48,46,44] },
  11: { cp: [20,18,16,14,12,10,8,6,4,2], li: [44,42,40,38,36,34,32,30,28,26,24,22], le: [58,56,54,52,50,48,46] },
  12: { cp: [20,18,16,14,12,10,8,6,4,2], li: [44,42,40,38,36,34,32,30,28,26,24,22], le: [52,50,48,46] },
  13: { cp: [22,20,18,16,14,12,10,8,6,4,2], li: [44,42,40,38,36,34,32,30,28,26,24], le: [54,52,50,48,46] },
  14: { cp: [9002,20,18,16,14,12,10,8,6,4,2], li: [36,34,32,30,28,26,24,22], le: [] },
  15: { cp: [],                              li: [14,12,10,8,6,4,2], le: [] },
};

function makeANF1row(rowNum) {
  const data = ANF1_DATA[rowNum];
  if (!data) return { zone: 'anf1', row: rowNum, seats: [] };
  const { cp, li, le } = data;
  const seats = [];

  // Par — Orden: LatParExt, Pasillo, LatParInt, Pasillo, CenPar
  if (le.length > 0) {
    le.forEach(n => seats.push({ n, s: 'P', section: 'lat-par-ext' }));
    if (li.length > 0 || cp.length > 0) seats.push({ aisle: true, label: rowNum });
  }
  if (li.length > 0) {
    li.forEach(n => seats.push({ n, s: 'P', section: 'lat-par-int' }));
    if (cp.length > 0) seats.push({ aisle: true, label: rowNum });
  }
  if (cp.length > 0) {
    cp.forEach(n => seats.push({ n, s: 'P', section: 'cen-par' }));
  }
  
  // Pasillo Central
  seats.push({ aisle: true });

  // Impar — Orden: CenImp, Pasillo, LatImpInt, Pasillo, LatImpExt
  if (cp.length > 0) {
    [...cp].reverse().forEach(n => seats.push({ n: n - 1, s: 'I', section: 'cen-imp' }));
    if (li.length > 0 || le.length > 0) seats.push({ aisle: true, label: rowNum });
  }
  if (li.length > 0) {
    [...li].reverse().forEach(n => seats.push({ n: n - 1, s: 'I', section: 'lat-imp-int' }));
    if (le.length > 0) seats.push({ aisle: true, label: rowNum });
  }
  if (le.length > 0) {
    [...le].reverse().forEach(n => seats.push({ n: n - 1, s: 'I', section: 'lat-imp-ext' }));
  }

  return { zone: 'anf1', row: rowNum, seats };
}

/* ═══════════════════════════════════════════════════════════════
   PLATEA — 18 filas
   ═══════════════════════════════════════════════════════════════ */
const PLATEA_DATA = {
  1:  { cp: 20, lp: [38, 36, 34, 32, 30, 28, 26, 24, 22] },
  2:  { cp: 22, lp: [40, 38, 36, 34, 32, 30, 28, 26, 24] },
  3:  { cp: 24, lp: [40, 38, 36, 34, 32, 30, 28, 26] },
  4:  { cp: 26, lp: [42, 40, 38, 36, 34, 32, 30, 28] },
  5:  { cp: 28, lp: [40, 38, 36, 34, 32, 30] },
  6:  { cp: 30, lp: [38, 36, 34, 32] },
  7:  { cp: 32, lp: [36, 34] },
  8:  { cp: 32, lp: [] },
  9:  { cp: 30, lp: [] },
  10: { cp: 28, lp: [] },
  11: { cp: 28, lp: [] },
  12: { cp: 26, lp: [] },
  13: { cp: 24, lp: [] },
  14: { cp: 22, lp: [] },
  15: { cp: 20, lp: [] },
  16: { cp: 18, lp: [] },
  17: { cp: 16, lp: [] },
  18: { cp: 14, lp: [] },
};

function makePLATEArow(rowNum) {
  const data = PLATEA_DATA[rowNum];
  if (!data) return { zone: 'platea', row: rowNum, seats: [] };
  const { cp, lp } = data;
  const seats = [];

  lp.forEach(n => seats.push({ n, s: 'P', section: 'lat-par' }));
  seats.push({ aisle: true });
  for (let n = cp; n >= 2; n -= 2)
    seats.push({ n, s: 'P', section: 'cen-par' });
  seats.push({ aisle: true });
  for (let n = 1; n <= cp - 1; n += 2)
    seats.push({ n, s: 'I', section: 'cen-imp' });
  seats.push({ aisle: true });
  const latImpBase = cp;
  lp.forEach((_, i) => seats.push({ n: latImpBase + 1 + i * 2, s: 'I', section: 'lat-imp' }));

  return { zone: 'platea', row: rowNum, seats };
}

/* ═══════════════════════════════════════════════════════════════
   LAYOUT COMPLETO — orden visual de arriba a abajo
   ═══════════════════════════════════════════════════════════════ */
const LAYOUT = [];

// Anfiteatro 2° (12 filas, la sección más alta)
for (let r = 12; r >= 1; r--) LAYOUT.push(makeANF2row(r));

// Anfiteatro 1° (15 filas, la sección intermedia)
for (let r = 15; r >= 1; r--) LAYOUT.push(makeANF1row(r));

// Palco Autoridades (bloqueado)
LAYOUT.push({ zone: 'palco', row: 0, seats: [] });

// Platea (fila 18 arriba → fila 1 junto al escenario)
for (let r = 18; r >= 1; r--) LAYOUT.push(makePLATEArow(r));

/* Helper: clave única para cada asiento */
function seatKey(zone, row, n, s) {
  return `${zone}|${row}|${n}|${s}`;
}


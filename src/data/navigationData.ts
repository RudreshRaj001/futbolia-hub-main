
// Define the structure for menu items
export interface SubMenuItem {
  name: string;
  path: string;
}

export interface MenuItem {
  name: string;
  path: string;
  submenu?: SubMenuItem[];
}

// Define the navigation structure
export const mainNavigation: MenuItem[] = [
  {
    name: 'Serie A',
    path: '/serie-a',
    submenu: [
      { name: 'Front page', path: '/serie-a' },
      { name: 'Calendar', path: '/torneos/242/calendario' },
      { name: 'Positions', path: '/torneos/242/posiciones' },
      { name: 'Scorers', path: '/torneos/242/goleadores' },
      { name: 'Teams', path: '/torneos/242/equipos' },
    ],
  },
  {
    name: 'Serie B',
    path: '/serie-b',
    submenu: [
      { name: 'Front page', path: '/serie-b' },
      { name: 'Calendar', path: '/torneos/243/calendario' },
      { name: 'Positions', path: '/torneos/243/posiciones' },
      { name: 'Scorers', path: '/torneos/243/goleadores' },
      { name: 'Teams', path: '/torneos/243/equipos' },
    ],
  },
  {
    name: 'Libertadores Cup',
    path: '/libertadores',
    submenu: [
      { name: 'Front page', path: '/libertadores' },
      { name: 'Calendar', path: '/torneos/13/calendario' },
      { name: 'Positions', path: '/torneos/13/posiciones' },
      { name: 'Scorers', path: '/torneos/13/goleadores' },
      { name: 'Teams', path: '/torneos/13/equipos' },
    ],
  },
  {
    name: 'South American Cup',
    path: '/sudamericana',
    submenu: [
      { name: 'Front page', path: '/sudamericana' },
      { name: 'Calendar', path: '/torneos/11/calendario' },
      { name: 'Positions', path: '/torneos/11/posiciones' },
      { name: 'Scorers', path: '/torneos/11/goleadores' },
      { name: 'Teams', path: '/torneos/11/equipos' },
    ],
  },
  // { name: 'Signings', path: '/fichajes' },
  { name: 'Qualifiers', path: '/eliminatorias' },
  { name: 'Selection', path: '/seleccion' },
  // { name: 'Abroad', path: '/extranjero' },
  { name: 'International', path: '/internacional' },
  // {
  //   name: 'Tournaments',
  //   path: '/torneos/71',
  //   submenu: [
  //     { name: 'Liga Pro Serie A', path: '/torneos/71' },
  //     { name: 'Liga Pro Serie B', path: '/torneos/72' },
  //     { name: 'Libertadores Cup', path: '/torneos/1100' },
  //     { name: 'South American Cup', path: '/torneos/11' },
  //     { name: 'Copa America 2024', path: '/torneos/9' },
  //     { name: 'Euro 2024', path: '/torneos/960' },
  //     { name: 'Champions League', path: '/torneos/1104' },
  //     { name: 'Europa League', path: '/torneos/1105' },
  //     { name: 'LaLiga Spain', path: '/torneos/1106' },
  //     { name: 'Premier League', path: '/torneos/1107' },
  //     { name: 'Serie A Italy', path: '/torneos/1108' },
  //     { name: 'Bundesliga', path: '/torneos/1109' },
  //     { name: 'Ligue 1 France', path: '/torneos/1110' },
  //     { name: 'Olympics', path: '/torneos/1111' },
  //   ],
  // },
];


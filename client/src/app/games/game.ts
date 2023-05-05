export interface Game {

_id: string;

 gameYear: number;
 gameGame: string;
 gameGenre: GameGenre;
 gamePublisher: string;
 gameoriginalPlatforms: string;
}

export type GameGenre = 'Strategy' | 'Action' | 'Role-playing' | 'Action Role-playing' |
'Action-adventure' | 'Turn-based strategy' | 'Adventure' | 'Platform' | 'Rhythm' |
'Real-time strategy' | 'Sandbox' | 'Puzzle-platformer' | 'Stealth' |
'First-person shooter' | 'Tactical role-playing' | 'Puzzle' |
'Digital collectible card' | 'Sports' | 'Simulation' | 'Battle royal' |
'Third-person shooter' | 'MOBA' | 'Tower defense' | 'Top-down shooter'|
'Shoot \'em up'|
'Vehicle simulation'|
'Maze'|
'Business simulation'|
'Space flight simulator'|
'Block breaker'|
'Racing'|
'Run and gun'|
'Beat \'em up'|
'God game'|
'City-building'|
'Fighting'|
'Survival horror'|
'Kart racing'|
'Real-time tactics'|
'Artillery'|
'MMORPG'|
'Life simulation'
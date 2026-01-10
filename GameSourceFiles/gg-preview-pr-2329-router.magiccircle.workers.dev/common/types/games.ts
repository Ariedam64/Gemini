/**
 * Represents the names of all available games excluding the Lobby.
 */

export const gameNames = [
  'Kiwi', // Infinicards
  'Trio', // Rock-Tac-Toe
  'Guava', // The Picture Game
  'Farkleberry',
  'Avocado', // The Question Game
  'Durian', // The Spy Game
  'Jalapeno', // Huge Manatees
  'AvocadoMini', // The Daily Question
  'Mango', // Global Poll
  'Nectarine', // King
  'Peach', // Mining Game
  'Quinoa', // Magic Garden
] as const;

export type GameName = (typeof gameNames)[number];

/**
 * Extends the GameName type to include 'Lobby', representing all available game
 * names including the Lobby.
 */
export type GameNameIncludingLobby = GameName | 'Lobby';

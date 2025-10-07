import { Character } from './character.model';

export interface Scenario {
  _id: string;
  title: string;
  description: string;
  characters: Character[];
}

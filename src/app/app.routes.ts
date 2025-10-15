import { Routes } from '@angular/router';
import { ScenariosComponent } from './scenarios/scenarios.component';
import { HomeComponent } from './home/home.component';
import { ScenarioComponent } from './scenarios/scenario/scenario.component';
import { CharacterComponent } from './scenarios/scenario/character/character.component';
import {
  AddCharacterComponent,
  canLeaveNewCharacterPage,
} from './scenarios/scenario/add-character/add-character.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'scenarios',
    component: ScenariosComponent,
  },
  {
    path: 'scenarios/:scenarioId',
    component: ScenarioComponent,
    title: 'Détails du scénario',
  },
  {
    path: 'scenarios/:scenarioId/characters/new',
    component: AddCharacterComponent,
    title: 'Ajouter un personnage',
    canDeactivate: [canLeaveNewCharacterPage],
  },
  {
    path: 'scenarios/:scenarioId/characters/:characterId',
    component: CharacterComponent,
    title: 'Détails du personnage',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page non trouvée',
  },
];

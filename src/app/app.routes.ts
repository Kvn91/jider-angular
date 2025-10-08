import { Routes } from '@angular/router';
import { ScenariosComponent } from './scenarios/scenarios.component';
import { HomeComponent } from './home/home.component';
import { ScenarioComponent } from './scenarios/scenario/scenario.component';
import { CharacterComponent } from './scenarios/scenario/character/character.component';
import { AddCharacterComponent } from './scenarios/scenario/add-character/add-character.component';
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
  },
  {
    path: 'scenarios/:scenarioId/characters/new',
    component: AddCharacterComponent,
  },
  {
    path: 'scenarios/:scenarioId/characters/:characterId',
    component: CharacterComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

import { Routes } from '@angular/router';
import { ScenariosComponent } from './scenarios/scenarios.component';
import { HomeComponent } from './home/home.component';
import { ScenarioComponent } from './scenarios/scenario/scenario.component';
import { CharacterComponent } from './scenarios/scenario/character/character.component';
import { SheetComponent } from './scenarios/scenario/sheet/sheet.component';

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
    children: [
      {
        path: 'sheet',
        component: SheetComponent,
      },
      {
        path: 'characterId/:characterId',
        component: CharacterComponent,
      },
    ],
  },
];

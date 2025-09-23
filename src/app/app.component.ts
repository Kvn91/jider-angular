import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CardListComponent } from './scenario/card-list/card-list.component';
import { AddScenarioComponent } from './scenario/add-scenario/add-scenario.component';
import { Scenario } from './scenario/scenario.model';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CardListComponent,
    AddScenarioComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  scenarios: Scenario[] = [
    {
      id: 1,
      title: 'Sauver le village',
      description: 'Protéger le village contre une attaque imminente.',
    },
    {
      id: 2,
      title: 'La relique perdue',
      description: 'Retrouver une relique disparue dans des ruines anciennes.',
    },
    {
      id: 3,
      title: 'L’ombre dans la forêt',
      description: 'Enquêter sur des disparitions mystérieuses en forêt.',
    },
    {
      id: 4,
      title: 'Le complot royal',
      description: 'Déjouer un complot contre la famille royale.',
    },
  ];

  ngOnInit() {
    this.loadScenarios();
  }

  saveScenarios() {
    localStorage.setItem('scenarios', JSON.stringify(this.scenarios));
  }

  loadScenarios() {
    const data = localStorage.getItem('scenarios');
    if (data) {
      this.scenarios = JSON.parse(data);
    } else {
      this.saveScenarios();
    }
  }

  onAddScenario(scenario: { title: string; description: string }) {
    const lastScenario = this.scenarios.at(-1);
    const newId = lastScenario ? lastScenario.id + 1 : 1;

    this.scenarios.push({
      ...scenario,
      id: newId,
    });
    this.saveScenarios();
  }

  onDeleteScenario(id: number) {
    this.scenarios = this.scenarios.filter((scenario) => scenario.id !== id);
    this.saveScenarios();
  }
}

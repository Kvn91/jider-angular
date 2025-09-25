import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Scenario } from '../scenarios/scenario.model';

@Injectable({ providedIn: 'root' })
export class ScenarioService {
  private httpClient = inject(HttpClient);

  fetchScenarios() {
    return this.httpClient.get<Scenario[]>('http://localhost:3500/scenarios');
  }

  addScenario(scenario: Scenario) {
    return this.httpClient.post('http://localhost:3500/scenarios', scenario);
  }

  deleteScenario() {}
}

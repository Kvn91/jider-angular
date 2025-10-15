import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Scenario } from '../models/scenario.model';
import { catchError, tap, throwError } from 'rxjs';
import { MessageType, ModalService } from '../shared/modal.service';

@Injectable({ providedIn: 'root' })
export class ScenarioService {
  private httpClient = inject(HttpClient);
  private scenarios = signal<Scenario[]>([]);
  loadedScenarios = this.scenarios.asReadonly();
  private modalService = inject(ModalService);

  fetchScenarios() {
    return this.httpClient
      .get<Scenario[]>('http://localhost:3500/scenarios')
      .pipe(
        tap({
          next: (scenarios) => {
            this.scenarios.set(scenarios);
          },
        }),
      );
  }

  fetchSingleScenario(_id: string) {
    return this.httpClient.get<Scenario>(
      `http://localhost:3500/scenarios/${_id}`,
    );
  }

  addScenario(scenario: { title: string; description: string }) {
    return this.httpClient
      .post<Scenario>('http://localhost:3500/scenarios', scenario)
      .pipe(
        tap({
          next: (newScenario) => {
            this.scenarios.update((scenarios) => [...scenarios, newScenario]);
          },
        }),
        catchError((error) => {
          console.error(error);
          const errorMsg = `Erreur lors de l'ajout d'un scénario. Veuillez réessayer plus tard.`;
          this.modalService.showModal(errorMsg, MessageType.Error);
          return throwError(() => new Error(errorMsg));
        }),
      );
  }

  deleteScenario(_id: string) {
    console.log('delete scenario id', _id);
    return this.httpClient
      .delete(`http://localhost:3500/scenarios/${_id}`)
      .pipe(
        tap({
          next: () => {
            this.scenarios.update((scenarios) =>
              scenarios.filter((scenario) => scenario._id !== _id),
            );
          },
        }),
        catchError((error) => {
          console.error(error);
          const errorMsg = `Erreur lors de la suppression d'un scénario. Veuillez réessayer plus tard.`;
          this.modalService.showModal(errorMsg, MessageType.Error);
          return throwError(() => new Error(errorMsg));
        }),
      );
  }

  addCharacter(params: {
    scenarioId: string;
    name: string;
    description: string;
  }) {
    return this.httpClient.post<Scenario>(
      `http://localhost:3500/scenarios/characters`,
      params,
    );
  }
}

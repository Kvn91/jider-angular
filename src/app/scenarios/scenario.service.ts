import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Scenario } from '../models/scenario.model';
import { catchError, tap, throwError } from 'rxjs';
import { MessageType, ModalService } from '../shared/modal.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ScenarioService {
  private httpClient = inject(HttpClient);
  private modalService = inject(ModalService);
  private authService = inject(AuthService);

  private apiUrl = 'http://localhost:3500/scenarios';
  private scenarios = signal<Scenario[]>([]);
  loadedScenarios = this.scenarios.asReadonly();

  fetchScenarios() {
    return this.httpClient.get<Scenario[]>(this.apiUrl).pipe(
      tap({
        next: (scenarios) => {
          this.scenarios.set(scenarios);
        },
      }),
    );
  }

  fetchSingleScenario(_id: string) {
    return this.httpClient.get<Scenario>(`${this.apiUrl}/${_id}`);
  }

  addScenario(scenario: { title: string; description: string }) {
    return this.httpClient.post<Scenario>(this.apiUrl, scenario).pipe(
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
    return this.httpClient.delete(`${this.apiUrl}/${_id}`).pipe(
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
    return this.httpClient.post<Scenario>(`${this.apiUrl}/characters`, params);
  }
}

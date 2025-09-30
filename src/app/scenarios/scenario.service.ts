import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Scenario } from '../scenarios/scenario.model';
import { catchError, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({ providedIn: 'root' })
export class ScenarioService {
  private httpClient = inject(HttpClient);
  private scenarios = signal<Scenario[]>([]);
  loadedScenarios = this.scenarios.asReadonly();
  private errorService = inject(ErrorService);

  fetchScenarios() {
    return this.httpClient
      .get<Scenario[]>('http://localhost:3500/scenarios')
      .pipe(
        tap({
          next: (scenarios) => {
            this.scenarios.set(scenarios);
          },
        }),
        catchError((error) => {
          console.error(error);
          const errorMsg = `Erreur lors du chargement des scénarios. Veuillez réessayer plus tard.`;
          this.errorService.showError(errorMsg);
          return throwError(() => new Error(errorMsg));
        }),
      );
  }

  addScenario(scenario: Scenario) {
    return this.httpClient
      .post('http://localhost:3500/scenarios', scenario)
      .pipe(
        tap({
          next: () => {
            this.scenarios.update((scenarios) => [...scenarios, scenario]);
          },
        }),
        catchError((error) => {
          console.error(error);
          const errorMsg = `Erreur lors de l'ajout d'un scénario. Veuillez réessayer plus tard.`;
          this.errorService.showError(errorMsg);
          return throwError(() => new Error(errorMsg));
        }),
      );
  }

  deleteScenario(id: number) {
    return this.httpClient.delete(`http://localhost:3500/scenarios/${id}`).pipe(
      tap({
        next: () => {
          this.scenarios.update((scenarios) =>
            scenarios.filter((scenario) => scenario.id !== id),
          );
        },
      }),
      catchError((error) => {
        console.error(error);
        const errorMsg = `Erreur lors de la suppression d'un scénario. Veuillez réessayer plus tard.`;
        this.errorService.showError(errorMsg);
        return throwError(() => new Error(errorMsg));
      }),
    );
  }
}

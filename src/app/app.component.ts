import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CardListComponent } from './scenarios/card-list/card-list.component';
import { AddScenarioComponent } from './scenarios/add-scenario/add-scenario.component';
import { ScenarioService } from './scenarios/scenario.service';

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
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal<string | null>(null);
  private scenariosService = inject(ScenarioService);
  scenarios = this.scenariosService.loadedScenarios;

  ngOnInit() {
    this.loadScenarios();
  }

  loadScenarios() {
    this.isFetching.set(true);
    const subscription = this.scenariosService.fetchScenarios().subscribe({
      error: (error) => {
        console.error('Error fetching scenario:', error);
        this.error.set(
          'Erreur lors du chargement des scénarios. Veuillez réessayer plus tard.',
        );
        this.isFetching.set(false);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onAddScenario(scenario: { title: string; description: string }) {
    const lastScenario = this.scenarios().slice(-1)[0];
    const newId = lastScenario ? lastScenario.id + 1 : 1;
    const newScenario = { ...scenario, id: newId };

    const subscription = this.scenariosService
      .addScenario(newScenario)
      .subscribe({
        error: (error) => {
          console.error('Error adding scenario:', error);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onDeleteScenario(id: number) {
    const subscription = this.scenariosService.deleteScenario(id).subscribe({
      error: (error) => {
        console.error('Error deleting scenario:', error);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CardListComponent } from '../card-list/card-list.component';
import { ScenarioService } from '../scenario.service';
import { ErrorService } from '../../shared/error.service';

@Component({
  selector: 'app-scenarios',
  imports: [CardListComponent],
  templateUrl: './scenarios.component.html',
})
export class ScenariosComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  private scenariosService = inject(ScenarioService);
  scenarios = this.scenariosService.loadedScenarios;
  private errorService = inject(ErrorService);
  error = this.errorService.error;

  ngOnInit() {
    this.loadScenarios();
  }

  loadScenarios() {
    this.isFetching.set(true);
    const subscription = this.scenariosService.fetchScenarios().subscribe({
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onDeleteScenario(id: number) {
    const subscription = this.scenariosService.deleteScenario(id).subscribe({});

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

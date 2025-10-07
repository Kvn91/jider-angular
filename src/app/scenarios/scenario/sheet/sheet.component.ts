import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { ScenarioService } from '../../scenario.service';
import { Scenario } from '../../../models/scenario.model';
import { ErrorService } from '../../../shared/error.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sheet',
  imports: [RouterLink],
  templateUrl: './sheet.component.html',
})
export class SheetComponent {
  scenarioId = input.required<string>();
  private scenariosService = inject(ScenarioService);
  private errorService = inject(ErrorService);
  error = this.errorService.error;
  scenario = signal<Scenario>({} as Scenario);
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loadScenario();
  }

  loadScenario() {
    const subscription = this.scenariosService
      .fetchSingleScenario(this.scenarioId())
      .subscribe({
        next: (scenario) => {
          this.scenario.set(scenario);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

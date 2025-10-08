import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Scenario } from '../../models/scenario.model';
import { ErrorService } from '../../shared/error.service';
import { ScenarioService } from '../scenario.service';

@Component({
  selector: 'app-scenario',
  imports: [RouterLink],
  templateUrl: './scenario.component.html',
})
export class ScenarioComponent implements OnInit {
  scenarioId = input.required<string>();
  private scenariosService = inject(ScenarioService);
  private errorService = inject(ErrorService);
  error = signal('');
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
        error: (err) => {
          this.errorService.showError(
            'Une erreur est survenue lors du chargement du scénario.',
          );
          this.error.set(err);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

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
import { ScenarioService } from '../scenario.service';
import { MessageType, ModalService } from '../../shared/modal.service';

@Component({
  selector: 'app-scenario',
  imports: [RouterLink],
  templateUrl: './scenario.component.html',
})
export class ScenarioComponent implements OnInit {
  scenarioId = input.required<string>();
  private scenariosService = inject(ScenarioService);
  private modalService = inject(ModalService);
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
          this.modalService.showModal(
            'Une erreur est survenue lors du chargement du scénario.',
            MessageType.Error,
          );
          this.error.set(err);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

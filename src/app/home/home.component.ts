import { Component, DestroyRef, inject } from '@angular/core';
import { AddScenarioComponent } from '../scenarios/add-scenario/add-scenario.component';
import { ScenariosComponent } from '../scenarios/scenarios.component';
import { ScenarioService } from '../scenarios/scenario.service';
import { ErrorService } from '../shared/error.service';

@Component({
  selector: 'app-home',
  imports: [AddScenarioComponent, ScenariosComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private scenariosService = inject(ScenarioService);
  scenarios = this.scenariosService.loadedScenarios;
  private destroyRef = inject(DestroyRef);

  onAddScenario(scenario: { title: string; description: string }) {
    const subscription = this.scenariosService
      .addScenario(scenario)
      .subscribe({});

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AddScenarioComponent } from './scenarios/add-scenario/add-scenario.component';
import { ScenarioService } from './scenarios/scenario.service';
import { ErrorService } from './shared/error.service';
import { ErrorModalComponent } from './shared/modal/error-modal/error-modal.component';
import { ScenariosComponent } from './scenarios/scenarios/scenarios.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AddScenarioComponent,
    ErrorModalComponent,
    ScenariosComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private scenariosService = inject(ScenarioService);
  scenarios = this.scenariosService.loadedScenarios;
  private destroyRef = inject(DestroyRef);
  private errorService = inject(ErrorService);
  error = this.errorService.error;

  onAddScenario(scenario: { title: string; description: string }) {
    const lastScenario = this.scenarios().slice(-1)[0];
    const newId = lastScenario ? lastScenario.id + 1 : 1;
    const newScenario = { ...scenario, id: newId };

    const subscription = this.scenariosService
      .addScenario(newScenario)
      .subscribe({});

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

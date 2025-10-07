import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { Character } from '../../../models/character.model';
import { ErrorService } from '../../../shared/error.service';
import { Scenario } from '../../../models/scenario.model';
import { ScenarioService } from '../../scenario.service';

@Component({
  selector: 'app-character',
  imports: [],
  templateUrl: './character.component.html',
})
export class CharacterComponent {
  scenarioId = input.required<string>();
  private scenariosService = inject(ScenarioService);
  private errorService = inject(ErrorService);
  error = this.errorService.error;
  scenario = signal<Scenario>({} as Scenario);
  destroyRef = inject(DestroyRef);
  characterId = input.required<string>();
  character = signal<Character>({} as Character);

  ngOnInit() {
    this.loadScenarioAndCharacter();
  }

  loadScenarioAndCharacter() {
    const subscription = this.scenariosService
      .fetchSingleScenario(this.scenarioId())
      .subscribe({
        next: (scenario) => {
          this.scenario.set(scenario);
          this.character.set(
            this.scenario().characters.find(
              (c) => c._id === this.characterId(),
            ) as Character,
          );
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

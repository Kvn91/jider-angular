import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { Character } from '../../../models/character.model';
import { Scenario } from '../../../models/scenario.model';
import { ScenarioService } from '../../scenario.service';
import { MessageType, ModalService } from '../../../shared/modal.service';

@Component({
  selector: 'app-character',
  imports: [],
  templateUrl: './character.component.html',
})
export class CharacterComponent {
  scenarioId = input.required<string>();
  private scenariosService = inject(ScenarioService);
  private modalService = inject(ModalService);
  error = signal('');
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

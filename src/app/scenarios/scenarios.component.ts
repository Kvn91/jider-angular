import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import { CardListComponent } from './card-list/card-list.component';
import { ScenarioService } from './scenario.service';
import { ModalService, MessageType } from '../shared/modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scenarios',
  imports: [CardListComponent, FormsModule],
  templateUrl: './scenarios.component.html',
})
export class ScenariosComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private scenariosService = inject(ScenarioService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private modalService = inject(ModalService);

  isFetching = signal(false);
  error = signal('');
  searchQuery = signal('');

  scenarios = this.scenariosService.loadedScenarios;
  filteredScenarios = computed(() => {
    const search = this.searchQuery().toLowerCase();
    return this.scenarios().filter(
      (scenario) =>
        scenario.title.toLowerCase().includes(search) ||
        scenario.description.toLowerCase().includes(search),
    );
  });

  ngOnInit() {
    this.loadScenarios();

    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        this.searchQuery.set(params['q'] || '');
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSearch(query: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { q: query || null },
      queryParamsHandling: 'merge',
    });
  }

  loadScenarios() {
    this.isFetching.set(true);
    const subscription = this.scenariosService.fetchScenarios().subscribe({
      error: (err) => {
        const errorMsg = `Erreur lors du chargement des scénarios. Veuillez réessayer plus tard.`;
        this.modalService.showModal(errorMsg, MessageType.Error);
        this.error.set(err);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onDeleteScenario(id: string) {
    const subscription = this.scenariosService.deleteScenario(id).subscribe({});

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

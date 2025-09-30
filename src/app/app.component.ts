import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CardListComponent } from './taches/card-list/card-list.component';
import { AddTacheComponent } from './taches/add-tache/add-tache.component';
import { Tache } from './taches/tache.model';
import { TacheService } from './services/tache.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CardListComponent,
    AddTacheComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  taches = signal<Tache[]>([]);
  isFetching = signal(false);
  error = signal<string | null>(null);
  private tachesService = inject(TacheService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loadTaches();
  }

  loadTaches() {
    this.isFetching.set(true);
    const subscription = this.tachesService.fetchTaches().subscribe({
      next: (data) => {
        this.taches.set(data);
      },
      error: (error) => {
        console.error('Error fetching tache:', error);
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

  onAddTache(tache: { title: string; description: string }) {
    const lastTache = this.taches().slice(-1)[0];
    const newId = lastTache ? lastTache.id + 1 : 1;
    const newTache = { ...tache, id: newId };

    const subscription = this.tachesService.addTache(newTache).subscribe({
      next: () => {
        this.taches.update((taches) => [...taches, newTache]);
      },
      error: (error) => {
        console.error('Error adding tache:', error);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

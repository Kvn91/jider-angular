import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tache } from '../taches/tache.model';

@Injectable({ providedIn: 'root' })
export class TacheService {
  private httpClient = inject(HttpClient);

  fetchTaches() {
    return this.httpClient.get<Tache[]>('http://localhost:3500/scenarios');
  }

  addTache(tache: Tache) {
    return this.httpClient.post('http://localhost:3500/scenarios', tache);
  }
}

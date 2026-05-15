import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Lending } from './model/lending';
import { PaginatedData } from '../core/model/page/PaginatedData';
import { HttpClient } from '@angular/common/http';
import { Game } from '../game/model/game';
import { Customer } from '../customer/model/customer';

@Injectable({
  providedIn: 'root',
})

export class LendingService {
    protected readonly http = inject(HttpClient);

    private baseUrl = 'http://localhost:8080/lending';

    getLendings(pageable: Pageable, gameId?: number, customerId?: number, date?: string): Observable<PaginatedData<Lending>> {
        return this.http.post<PaginatedData<Lending>>(this.baseUrl, { pageableRequest: pageable, gameId, customerId, date });
    }

    saveLending(lending: Lending): Observable<Lending> {
        const { id } = lending;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Lending>(url, lending);
    }

    deleteLending(idLending: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idLending}`);
    }

    getAllLendings(): Observable<Lending[]> {
        return this.http.get<Lending[]>(this.baseUrl);
    }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LendingService } from '../lending.service';
import { Lending } from '../model/lending';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Game } from '../../game/model/game';
import { Customer } from '../../customer/model/customer';
import { CustomerService } from '../../customer/customer.service';
import { GameService } from '../../game/game.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-lending-edit',
    standalone: true,
    imports: [
      FormsModule, 
      ReactiveFormsModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatButtonModule,
      MatSelectModule,
      MatDatepickerModule
    ],
    providers: [ DatePipe ],
    templateUrl: './lending-edit.html',
    styleUrl: './lending-edit.scss',
})

export class LendingEdit implements OnInit {
    protected readonly lendingService = inject(LendingService);
    protected readonly customerService = inject(CustomerService);
    protected readonly gameService = inject(GameService)
    protected readonly dialogRef = inject(MatDialogRef<LendingEdit>);
    protected readonly data = inject(MAT_DIALOG_DATA);
    protected readonly datePipe = inject(DatePipe);

    protected readonly id = signal<number | null>(null);
    protected readonly game = signal<Game | null>(null);
    protected readonly customer = signal<Customer | null>(null);
    protected readonly loanDate = signal<Date | null>(null);
    protected readonly returnDate = signal<Date | null>(null);

    protected readonly games = signal<Game[]>([]);
    protected readonly customers = signal<Customer[]>([]);

    loadFormData(initialData: Lending | null) {
        this.id.set(initialData?.id ?? null);
        this.game.set(initialData?.game ?? null);
        this.customer.set(initialData?.customer ?? null);
        this.loanDate.set(initialData?.loanDate ?? null);
        this.returnDate.set(initialData?.returnDate ?? null);

        this.customerService.getCustomers().subscribe((customers) => {
            this.customers.set(customers);
            this.customer.set(initialData?.customer ?? null);
        });

        this.gameService.getGames().subscribe((games) => {
            this.games.set(games);
            this.game.set(initialData?.game ?? null);
        });
    }

    ngOnInit(): void {
        this.loadFormData(this.data.lending ?? null);
    }

    onSave() {
        const lending: Lending = {
            id: this.id(),
            loanDate: this.formatDate(this.loanDate()),
            returnDate: this.formatDate(this.returnDate()),
            game: this.games().find(g => g.id === this.game()?.id) ?? null,
            customer: this.customers().find(c => c.id === this.customer()?.id) ?? null,
        };
        
        this.lendingService.saveLending(lending).subscribe(() => {
            this.dialogRef.close(true);
        });
    }

    private formatDate(date: Date | null): Date | null {
        if (!date) return null;

        
        return new Date(Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        ));

    }

    onClose() {
        this.dialogRef.close(false);
    }
}


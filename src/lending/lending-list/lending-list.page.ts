import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LendingEdit } from '../lending-edit/lending-edit';
import { LendingService } from '../lending.service';
import { Lending } from '../model/lending';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Game } from '../../game/model/game';
import { Customer } from '../../customer/model/customer';
import { GameService } from '../../game/game.service';
import { CustomerService } from '../../customer/customer.service';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
    selector: 'app-lending-list',
    standalone: true,
    imports: [
        MatButtonModule, 
        MatIconModule, 
        MatTableModule, 
        CommonModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        MatDatepickerModule,
    ],
    templateUrl: './lending-list.page.html',
    styleUrl: './lending-list.page.scss',
    providers: [ DatePipe ]
})

export class LendingListPage implements OnInit {
    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    dataSource = new MatTableDataSource<Lending>();
    displayedColumns: string[] = ['id', 'game', 'customer', 'loanDate', 'returnDate', 'action'];

    constructor(private lendingService: LendingService, public dialog: MatDialog, private datePipe: DatePipe) {}

    protected readonly games = signal<Game[]>([]);
    protected readonly customers = signal<Customer[]>([]);
    protected readonly filterGame = signal<Game | null>(null);
    protected readonly filterCustomer = signal<Customer | null>(null);
    protected readonly filterDate = signal<Date | null>(null);

    protected readonly gameService = inject(GameService);
    protected readonly customerService = inject(CustomerService);

    ngOnInit(): void {
        this.loadPage();
        this.customerService.getCustomers().subscribe((customers) => this.customers.set(customers));
        this.gameService.getGames().subscribe((games) => this.games.set(games));
    }

    
    onFilterChange() {
        this.pageNumber = 0;
        this.loadPage();
    }

    onPageChange(event: PageEvent) {
        this.loadPage(event);
    }


    onCleanFilter(): void {
        this.filterGame.set(null);
        this.filterCustomer.set(null);
        this.filterDate.set(null);
        this.loadPage();
    }

    onSearch(): void {
        this.loadPage();
    }

    loadPage(event?: PageEvent) {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                },
            ],
        };

        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }

        const gameId = this.filterGame()?.id;
        const customerId = this.filterCustomer()?.id;
        const date = this.datePipe.transform(this.filterDate(), 'yyyy-MM-dd');

        this.lendingService.getLendings(pageable, gameId, customerId, date).subscribe((data) => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    createLending() {
        const dialogRef = this.dialog.open(LendingEdit, {
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    editLending(lending: Lending) {
        const dialogRef = this.dialog.open(LendingEdit, {
            data: { lending: lending },
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    deleteLending(lending: Lending) {
        const dialogRef = this.dialog.open(DialogConfirmation, {
            data: {
                title: 'Eliminar préstamo',
                description:
                    'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.lendingService.deleteLending(lending.id).subscribe((result) => {
                    this.ngOnInit();
                });
            }
        });
    }
}


import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../model/customer';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEdit } from '../customer-edit/customer-edit';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';

@Component({
    selector: 'app-customer-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule
    ],
    templateUrl: './customer-list.page.html',
    styleUrl: './customer-list.page.scss'
})

export class CustomerListPage implements OnInit{

    dataSource = new MatTableDataSource<Customer>();
    displayedColumns: string[] = ['id', 'name', 'action'];

    protected readonly dialog = inject(MatDialog);
    protected readonly customerService = inject(CustomerService);

    ngOnInit(): void {
        this.customerService.getCustomers().subscribe(
            customers => this.dataSource.data = customers
        );
    }

    loadData(): void {
      this.customerService
        .getCustomers()
        .subscribe((customers) => (this.dataSource.data = customers));
    }


    createCustomer() {    
      const dialogRef = this.dialog.open(CustomerEdit, {
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(!result) return;
        this.loadData();
      });    
    }  

    editCustomer(customer: Customer) {
      const dialogRef = this.dialog.open(CustomerEdit, {
        data: { customer }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(!result) return;
        this.loadData();
      });
    }

    deleteCustomer(customer: Customer) {    
      const dialogRef = this.dialog.open(DialogConfirmation, {
        data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.customerService.deleteCustomer(customer.id).subscribe(result => {
            this.loadData();
          }); 
        }
      });
    }  
}


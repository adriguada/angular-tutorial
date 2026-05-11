import { Component, OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { Customer } from '../model/customer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-customer-edit',
    standalone: true,
    imports: [
      FormsModule, 
      ReactiveFormsModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatButtonModule ],
    templateUrl: './customer-edit.html',
    styleUrl: './customer-edit.scss'
})

export class CustomerEdit implements OnInit {
    protected readonly dialogRef = inject(MatDialogRef<CustomerEdit>);
    protected readonly data = inject(MAT_DIALOG_DATA) as { customer: Customer };
    protected readonly customerService = inject(CustomerService);

    protected readonly id = signal<number | null>(null);
    protected readonly name = signal<string | null>(null);

    ngOnInit(): void {
        this.loadFormData(this.data.customer ?? null);
    }

    loadFormData(initialData: Customer | null): void {
        this.id.set(initialData?.id ?? null);
        this.name.set(initialData?.name ?? null);
    }

    onSave() {
        const customer: Customer = { id: this.id(), name: this.name() };
        this.customerService.saveCustomer(customer).subscribe(() => {
            this.dialogRef.close(true);
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}

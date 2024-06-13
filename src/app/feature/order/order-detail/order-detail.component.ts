import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormHelper } from '@app/core/helpers/form-helper';
import { OrderService } from '@app/core/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderID'));
  }

  existingOrder: any = null;
  orderId: number

  ngOnInit(): void {
    this.loadDetailOrder()
  }

  loadDetailOrder() {
    this.orderService.findOrder(this.orderId).subscribe({
      next: (res: any) => {
        this.existingOrder = res.data
      },
      error: (res: HttpErrorResponse) => {
        console.log("error: ", res);
      }
    })
  }



}

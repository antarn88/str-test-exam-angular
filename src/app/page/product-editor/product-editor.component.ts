import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  product: Product = new Product();
  productId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>
      this.productId = Number(params.id));
    this.getProduct();
  }

  getProduct(): void {
    if (this.productId !== 0) {
      this.productService.get(this.productId).subscribe(
        product => this.product = product,
        error => console.error(error)
      );
    }
  }

  setProductToDatabase(product: Product): void {
    if (product.id === 0) {
      this.productService.create(product).subscribe(
        () => this.router.navigate(['']),
        error => console.error(error)
      );
    }
    else {
      this.productService.update(product).subscribe(
        () => this.router.navigate(['']),
        error => console.error(error)
      );
    }
  }

}

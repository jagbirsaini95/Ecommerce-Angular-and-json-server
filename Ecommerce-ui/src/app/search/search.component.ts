import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { product } from "../data-types";
import { ProductService } from "../Services/product.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent {
  searchResult: product[];
  noProductFound: boolean = true;
  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const searchquery = this.activeRoute.snapshot.paramMap.get("searchitem");
    this.searchResult = [];
    this.productService.searchProduct(searchquery).subscribe((res) => {
      if (res.length > 0) {
        this.searchResult = res;
        this.noProductFound = false;
      }
    });
  }
}

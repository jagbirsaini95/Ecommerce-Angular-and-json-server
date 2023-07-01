import { Component, OnInit, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  dev: string = "Jagbir Singh";
  appName = "First Angular " + VERSION.major;
  ngOnInit() {
    console.log(
      "Dev: " + this.dev + ", " + this.appName + " Application running......"
    );
  }
}

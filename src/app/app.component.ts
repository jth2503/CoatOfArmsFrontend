import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoatOfArmsFrontend';

  // menu items
  links = [
    {name: "Dummy", info: "Dummy-Info", route: ""},
    {name: "Begriffseditor", info: "Zum Bearbeiten der Begriffe", route: "/termeditor"},
    {name: "Bearbeitung von Wappen", info: "Zur Bearbeitung der bereits eingepflegten Wappen", route: "/coa-list"},
    {name: "Neues Wappen anlegen", info: "Zum Anlegen eines neuen Wappens", route: "/upsert-coa"}
  ]
}

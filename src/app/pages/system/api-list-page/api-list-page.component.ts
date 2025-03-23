import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateButtonComponent } from '../../../components/common/create-button/create-button.component';
import { SearchButtonComponent } from '../../../components/common/search-button/search-button.component';
import { ActionbarComponent } from '../../../components/layout/actionbar/actionbar.component';
import { ContentComponent } from '../../../components/layout/content/content.component';
import { ApiMethodSelectComponent } from '../../../components/system/api-method-select/api-method-select.component';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'app-api-list-page',
  imports: [
    ContentComponent,
    NzCardModule,
    SearchButtonComponent,
    NzInputModule,
    ActionbarComponent,
    ApiMethodSelectComponent,
    FormsModule,
    NzButtonModule,
    CreateButtonComponent,
  ],
  templateUrl: './api-list-page.component.html',
  styleUrl: './api-list-page.component.scss',
})
export class ApiListPageComponent {
  query: string = '';
  queryMethod: string = '';
  constructor(private title: TitleService) {
    this.title.setTitle('系统管理 | API列表');
  }

  search() {
    console.log(this.query);
    console.log(this.queryMethod);
  }
}

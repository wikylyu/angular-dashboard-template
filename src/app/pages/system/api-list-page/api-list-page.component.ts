import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CardComponent } from '../../../components/common/card/card.component';
import { CreateButtonComponent } from '../../../components/common/create-button/create-button.component';
import { SearchButtonComponent } from '../../../components/common/search-button/search-button.component';
import { ActionbarComponent } from '../../../components/layout/actionbar/actionbar.component';
import { ContentComponent } from '../../../components/layout/content/content.component';
import { ApiMethodSelectComponent } from '../../../components/system/api-method-select/api-method-select.component';
import { ApiMethodComponent } from '../../../components/system/api-method/api-method.component';
import { EndpointPathSelectComponent } from '../../../components/system/endpoint-path-select/endpoint-path-select.component';
import { PermissionLabelComponent } from '../../../components/system/permission-label/permission-label.component';
import { Api } from '../../../models/system';
import { SystemApiService } from '../../../services/apis/system-api.service';

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
    EndpointPathSelectComponent,
    CardComponent,
    NzTableModule,
    DatePipe,
    PermissionLabelComponent,
    NzDropDownModule,
    ApiMethodComponent,
    NzIconModule,
  ],
  templateUrl: './api-list-page.component.html',
  styleUrl: './api-list-page.component.scss',
})
export class ApiListPageComponent implements OnInit {
  queryPath: string = '';
  queryMethod: string = '';
  page: number = 1;
  pageSize: number = 10;
  total: number = 0;
  items: Api[] = [];
  loading: boolean = false;

  constructor(private systemApi: SystemApiService) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.page = 1;
    this.findApis();
  }

  async findApis() {
    try {
      this.loading = true;
      const r = await this.systemApi.findApis({
        method: this.queryMethod,
        path: this.queryPath,
        page: this.page,
        page_size: this.pageSize,
      });
      this.items = r.items;
      this.total = r.total;
      this.page = r.page;
      this.pageSize = r.page_size;
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  update(data: any) {}
}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AdminUserLabelComponent } from '../../../components/admin/admin-user-label/admin-user-label.component';
import { CardComponent } from '../../../components/common/card/card.component';
import { CreateButtonComponent } from '../../../components/common/create-button/create-button.component';
import { SearchButtonComponent } from '../../../components/common/search-button/search-button.component';
import { PageActionbarComponent } from '../../../components/layout/page-actionbar/page-actionbar.component';
import { PageContentComponent } from '../../../components/layout/page-content/page-content.component';
import { HttpMethodSelectComponent } from '../../../components/system/http-method-select/http-method-select.component';
import { HttpMethodComponent } from '../../../components/system/http-method/http-method.component';
import { PermissionLabelComponent } from '../../../components/system/permission-label/permission-label.component';
import { RoutePathSelectComponent } from '../../../components/system/route-path-select/route-path-select.component';
import { UpdateApiModalComponent } from '../../../components/system/update-api-modal/update-api-modal.component';
import { Api } from '../../../models/system';
import { SystemApiService } from '../../../services/apis/system-api.service';
import { deepCopy } from '../../../utils/data';

@Component({
  selector: 'app-api-list-page',
  imports: [
    PageContentComponent,
    NzCardModule,
    SearchButtonComponent,
    NzInputModule,
    PageActionbarComponent,
    HttpMethodSelectComponent,
    FormsModule,
    NzModalModule,
    NzButtonModule,
    CreateButtonComponent,
    RoutePathSelectComponent,
    CardComponent,
    NzTableModule,
    DatePipe,
    PermissionLabelComponent,
    NzDropdownModule,
    HttpMethodComponent,
    NzIconModule,
    AdminUserLabelComponent,
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

  constructor(
    private systemApi: SystemApiService,
    private modalService: NzModalService,
  ) {}

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

  update(data: Api | undefined = undefined) {
    this.modalService
      .create({
        nzContent: UpdateApiModalComponent,
        nzWidth: '640px',
        nzData: deepCopy(data),
      })
      .afterClose.subscribe((r) => {
        if (r) {
          this.findApis();
        }
      });
  }

  delete(data: Api) {
    this.modalService.confirm({
      nzTitle: '删除API',
      nzContent: '是否确认删除该API?',
      nzOkDanger: true,
      nzOnOk: () => this.deleteApi(data),
    });
  }

  async deleteApi(data: Api) {
    try {
      await this.systemApi.deleteApi(data.id);
    } catch (error) {
    } finally {
      this.findApis();
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AntdModule } from './antd.module';
import { IconsProviderModule } from './icon-provider.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { ApiInterceptor } from '../services/api.interceptor';
import zh from '@angular/common/locales/zh';
import { InputComponent } from './components/input/input.component';
import { PageActionbarComponent } from './components/page-actionbar/page-actionbar.component';
import { PageContentComponent } from './components/page-content/page-content.component';
import { DateComponent } from './components/date/date.component';
import { DatetimeComponent } from './components/datetime/datetime.component';
import { SearchButtonComponent } from './components/search-button/search-button.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    InputComponent,
    PageActionbarComponent,
    PageContentComponent,
    DateComponent,
    DatetimeComponent,
    SearchButtonComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    AntdModule,
    IconsProviderModule,
    DragDropModule,
    ClipboardModule,
  ],
  exports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    AntdModule,
    IconsProviderModule,
    DragDropModule,
    ClipboardModule,

    InputComponent,
    PageActionbarComponent,
    PageContentComponent,
    DateComponent,
    DatetimeComponent,
    SearchButtonComponent,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
})
export class BaseModule {}

# Angular 后台管理系统模板

使用[Angular](https://angular.io/)+[Ant Design](https://ng.ant.design/docs/introduce/en)开发

只实现了基本的框架，没有额外功能。

需要配合相关的后台模板使用。（暂时未实现）

## 使用方式

使用该模板后，需要修改以下内容使其符合实际需求。

### 项目名

- 将 **package.json** 中的项目名 _angular-dashboard-template_ 修改为实际项目名。
- 将 **angular.json** 中的 _angular-dashboard-template_ 修改为实际项目名。建议直接使用编辑器（如 VSCode）的替换功能。
- 将 **src/environments/environment.ts** 和 **src/environments/environment.prod.ts** 中的 _appName_ 修改为项目的展示名。
- 将 **src/index.html** 中的 _title_ 标签修改为项目的展示名。

### 接口地址

- 将 **proxy.config.json** 中的接口地址修改为实际开发的接口地址。

### 网站图标

- 将 **src/favicon.ico** 修改为实际项目的图标

## 📋 Tổng Quan

---

## 🏗️ Kiến trúc hệ thống

---

## 🔧 Các Module Chính

- `webpack > 5.0`
- `react > 18.0`

---

## 🔧 Yêu Cầu Hệ Thống

---

## 📝 Ghi Chú Quan Trọng

- Microfrontend được sử dụng để tách biệt các module của dự án.
- Kiến trúc microfrontend gồm (1) container liên kết các module `remotes` nhỏ, (2) module `remotes` nhỏ được `exposes` ra ngoài để được container gọi sử dụng.
- Mỗi module `remotes` được phát triển tách biệt và được build riêng lẻ. Sau đó, được `deploy` lên một server riêng biệt. Cuối cùng được `exposes` ra ngoài để được container gọi sử dụng.
- Mỗi module khi `exposes` ra ngoài sẽ được build thành một file `[filename].js`.
- Container sẽ được build và chạy trên một server riêng biệt. Sau đó, được kết nối với các module `remotes` thông qua `[module-name]@[module-server-url]/[filename].js`.

### Cấu hình:

#### Cấu hình webpack.js

```
Examples:
.................................
plugins: [
    new ModuleFederationPlugin({
      name: 'app',
      filename: 'remoteEntry.js',
      remotes: {
        app2: 'app2@http://localhost:3001/remoteEntry.js',
      },
      exposes: {
        './components/LayoutComponents/Page':
          './app/components/LayoutComponents/Page/index.js',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },
    })
]
-------------------
General (React version):
.................................
plugins: [
    new ModuleFederationPlugin({
      name: [module-name],
      filename: [filename].js,
      remotes: {
        [container-name]: '[container-name]@[container-server-url]/[filename].js',
      },
      exposes: {
        [remote-component-path]:
          './[component-path]/[filename].js',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },
    })
]
```

- Sử dụng:

```
Examples:
.................................
import Page from 'app/components/LayoutComponents/Page';
-------------------
General (React version):
.................................
import [component-name] from '[module-name]/[remote-component-path]';
```

- Kiến trúc này cần sử dụng `ModuleFederationPlugin` của `webpack`

---

#### Cấu hình index.js

- index.js

```

import('./bootstrap');

```

- bootstrap.js

```

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

```

- Xoá `ckeditor5-classic-inline-editor` và `react-trello` trong `package.json`
- Phải thêm các dependencies vào `ModuleFederationPlugin`
## 📥 Hướng Dẫn Cài Đặt Chi Tiết

### 🏭 Môi Trường Production

### 💻 Môi Trường Development

---

## 📜 Changelog

Xem [CHANGELOG.md](CHANGELOG.md) để biết lịch sử thay đổi.

---

## ⚖️ Quy Tắc Ứng Xử

Dự án này tuân theo bộ quy tắc ứng xử cho cộng đồng. Xem file [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) để biết thêm chi tiết về các quy tắc và hành vi được chấp nhận.

---

## 🐛 Báo Cáo Lỗi & Góp Ý

---

### 📝 Issues

- Báo cáo lỗi và đề xuất tính năng mới tại [GitHub Issues](https://github.com/olp-dtu-2024/DTU-GreenHope/issues)

### 🔒 Bảo Mật

## 📄 Giấy Phép

---

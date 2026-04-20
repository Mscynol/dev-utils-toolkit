# Dev Utils Toolkit

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/github/stars/Mscynol/dev-utils-toolkit?style=social" alt="GitHub Stars">
</p>

<p align="center">
  <b>实用的开发工具函数库，包含 JavaScript 和 Python 两套工具集</b>
</p>

<p align="center">
  <a href="#特性">特性</a> •
  <a href="#安装">安装</a> •
  <a href="#使用指南">使用指南</a> •
  <a href="#API文档">API文档</a> •
  <a href="#贡献">贡献</a>
</p>

---

## 特性

- 📦 **零依赖** - 核心功能不依赖第三方库
- 🔷 **TypeScript 支持** - 完整的类型定义
- 🚀 **现代语法** - 使用 ES6+ 和 Python 3.8+
- 📖 **完整文档** - 每个函数都有详细的 JSDoc/Docstring
- 🧪 **测试覆盖** - 单元测试确保代码质量
- ⚡ **高性能** - 经过优化的算法实现

## 安装

### JavaScript / TypeScript

```bash
npm install @dev/utils-toolkit
# 或
yarn add @dev/utils-toolkit
```

### Python

```bash
pip install dev-utils-toolkit
```

## 使用指南

### JavaScript

#### 数组工具

```javascript
import { unique, flatten, groupBy, shuffle, chunk } from '@dev/utils-toolkit';

// 数组去重
unique([1, 2, 2, 3]); // [1, 2, 3]

// 数组扁平化
flatten([1, [2, 3], [4, [5]]]); // [1, 2, 3, 4, 5]

// 按属性分组
groupBy([{type: 'a', val: 1}, {type: 'b', val: 2}, {type: 'a', val: 3}], 'type');
// { a: [{type: 'a', val: 1}, {type: 'a', val: 3}], b: [{type: 'b', val: 2}] }

// 随机打乱
shuffle([1, 2, 3, 4, 5]); // [3, 1, 5, 2, 4] (随机)

// 分块
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

#### 日期工具

```javascript
import { format, fromNow, addDays, isWeekend } from '@dev/utils-toolkit';

// 格式化日期
format(new Date(), 'YYYY-MM-DD HH:mm:ss'); // '2025-01-01 10:00:00'

// 相对时间
fromNow(Date.now() - 60000); // '1分钟前'
fromNow(Date.now() + 86400000); // '1天后'

// 日期计算
addDays(new Date(), 7); // 7天后的日期

// 判断周末
isWeekend(new Date('2025-01-04')); // true (周六)
```

#### 字符串工具

```javascript
import { mask, randomCode, camelCase, kebabCase } from '@dev/utils-toolkit';

// 脱敏处理
mask('13800138000', 3, 4); // '138****8000'
mask('1234567890123456', 4, 4, '#'); // '1234########3456'

// 随机验证码
randomCode(6); // '123456' (数字)
randomCode(6, 'mixed'); // 'A3f7K9' (混合)

// 命名风格转换
camelCase('hello-world'); // 'helloWorld'
kebabCase('helloWorld'); // 'hello-world'
```

#### 验证工具

```javascript
import { isEmail, isPhone, isIdCard, isUrl } from '@dev/utils-toolkit';

isEmail('test@example.com'); // true
isPhone('13800138000'); // true
isIdCard('110101199001011234'); // true
isUrl('https://example.com'); // true
```

#### Storage 工具

```javascript
import { storage, session } from '@dev/utils-toolkit';

// localStorage 封装（支持过期时间）
storage.set('key', { data: 'value' }, 3600); // 1小时后过期
storage.get('key'); // { data: 'value' }

// sessionStorage 封装
session.set('temp', 'value');
session.get('temp'); // 'value'
```

### Python

#### 时间工具

```python
from dev_utils_toolkit.time_utils import now_str, today, timestamp, add_days

# 当前时间字符串
now_str()  # '2025-01-01 10:00:00'
now_str('%Y-%m-%d')  # '2025-01-01'

# 今天日期
today()  # datetime.date(2025, 1, 1)

# 时间戳
timestamp()  # 1704085200

# 日期计算
add_days(7)  # 7天后的日期
```

#### 文件工具

```python
from dev_utils_toolkit.file_utils import read_file, write_json, ensure_dir

# 读取文件
content = read_file('data.txt')

# 写入 JSON
write_json('data.json', {'key': 'value'}, indent=2)

# 确保目录存在
ensure_dir('path/to/dir')
```

#### 通用工具

```python
from dev_utils_toolkit.utils import md5, random_string, retry

# MD5 哈希
md5('text')  # 'd8e8fca2dc0f896fd7cb4cb0031ba249'

# 随机字符串
random_string(8)  # 'aB3k9mP2'
random_string(8, digits_only=True)  # '12345678'

# 重试装饰器
@retry(max_attempts=3, delay=1)
def fetch_data():
    # 可能失败的网络请求
    pass
```

## API文档

### JavaScript API

| 模块 | 函数 | 描述 |
|------|------|------|
| **array-utils** | `unique(arr)` | 数组去重 |
| | `flatten(arr, depth)` | 数组扁平化 |
| | `groupBy(arr, key)` | 按属性分组 |
| | `shuffle(arr)` | 随机打乱数组 |
| | `chunk(arr, size)` | 数组分块 |
| | `intersection(...arrs)` | 数组交集 |
| | `difference(arr1, arr2)` | 数组差集 |
| | `sortBy(arr, key, order)` | 按属性排序 |
| **date-utils** | `format(date, pattern)` | 格式化日期 |
| | `fromNow(date)` | 相对时间描述 |
| | `addDays(date, days)` | 添加天数 |
| | `isWeekend(date)` | 判断是否周末 |
| | `daysBetween(d1, d2)` | 计算天数差 |
| **string-utils** | `mask(str, start, end, char)` | 字符串脱敏 |
| | `randomCode(length, type)` | 生成随机码 |
| | `camelCase(str)` | 转驼峰命名 |
| | `kebabCase(str)` | 转短横线命名 |
| | `truncate(str, length)` | 截断字符串 |
| **validate-utils** | `isEmail(str)` | 邮箱验证 |
| | `isPhone(str)` | 手机号验证 |
| | `isIdCard(str)` | 身份证号验证 |
| | `isUrl(str)` | URL 验证 |
| **storage-utils** | `storage.set(key, val, ttl)` | 设置本地存储 |
| | `storage.get(key)` | 获取本地存储 |
| | `storage.remove(key)` | 删除本地存储 |
| | `storage.clear()` | 清空本地存储 |

### Python API

| 模块 | 函数 | 描述 |
|------|------|------|
| **time_utils** | `now_str(fmt)` | 当前时间字符串 |
| | `today()` | 今天日期 |
| | `timestamp()` | 当前时间戳 |
| | `add_days(days)` | 添加天数 |
| | `format_datetime(dt, fmt)` | 格式化日期时间 |
| **file_utils** | `read_file(path, encoding)` | 读取文件 |
| | `write_file(path, content)` | 写入文件 |
| | `write_json(path, data)` | 写入 JSON |
| | `read_json(path)` | 读取 JSON |
| | `ensure_dir(path)` | 确保目录存在 |
| **utils** | `md5(text)` | MD5 哈希 |
| | `sha256(text)` | SHA256 哈希 |
| | `random_string(length)` | 随机字符串 |
| | `retry(max_attempts, delay)` | 重试装饰器 |

## 目录结构

```
dev-utils-toolkit/
├── src/
│   ├── js/                    # JavaScript 工具
│   │   ├── index.js           # 统一导出
│   │   ├── array-utils.js     # 数组操作
│   │   ├── date-utils.js      # 日期时间
│   │   ├── storage-utils.js   # localStorage 封装
│   │   ├── string-utils.js    # 字符串处理
│   │   └── validate-utils.js  # 表单验证
│   └── python/                # Python 工具
│       ├── __init__.py
│       ├── file_utils.py      # 文件操作
│       ├── time_utils.py      # 时间处理
│       └── utils.py           # 通用工具
├── types/                     # TypeScript 类型定义
├── tests/                     # 测试文件
├── docs/                      # 文档
├── CHANGELOG.md               # 更新日志
├── CONTRIBUTING.md            # 贡献指南
├── CODE_OF_CONDUCT.md         # 行为准则
└── LICENSE                    # 许可证
```

## 贡献

我们欢迎所有形式的贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与。

## 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解所有版本更新内容。

## 行为准则

本项目遵循 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) 中定义的行为准则。

## 许可证

[MIT](LICENSE) © 2026 Alexis

---

<p align="center">
  如果这个项目对你有帮助，请给它一个 ⭐️
</p>

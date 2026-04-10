# Dev Utils Toolkit

实用的开发工具函数库，包含 JavaScript 和 Python 两套工具集。

## 目录结构

```
src/
├── js/           # JavaScript/TypeScript 工具
│   ├── array-utils.js      # 数组操作
│   ├── date-utils.js       # 日期时间
│   ├── storage-utils.js    # localStorage 封装
│   ├── string-utils.js     # 字符串处理
│   └── validate-utils.js   # 表单验证
└── python/       # Python 工具
    ├── file_utils.py       # 文件操作
    ├── time_utils.py       # 时间处理
    └── utils.py            # 通用工具
```

## JavaScript 使用示例

```javascript
// 数组工具
import { unique, flatten, groupBy } from './src/js/array-utils.js';
unique([1, 2, 2, 3]);           // [1, 2, 3]
groupBy([{type: 'a'}, {type: 'b'}], 'type');

// 日期工具
import { format, fromNow } from './src/js/date-utils.js';
format(new Date(), 'YYYY-MM-DD');     // '2025-01-01'
fromNow(Date.now() - 60000);          // '1分钟前'

// 字符串工具
import { mask, randomCode } from './src/js/string-utils.js';
mask('13800138000', 3, 4);      // '138****8000'
randomCode(6);                   // '123456'

// 验证工具
import { isEmail, isPhone } from './src/js/validate-utils.js';
isEmail('test@example.com');    // true
```

## Python 使用示例

```python
from src.python.time_utils import now_str, today, timestamp
from src.python.file_utils import read_file, write_json
from src.python.utils import md5, random_string, retry

now_str()                       # '2025-01-01 10:00:00'
md5('text')                     # MD5 哈希
random_string(8)                # 随机字符串

# 带重试的装饰器
@retry(max_attempts=3)
def fetch_data():
    pass
```

## License

MIT

# 更新日志

所有 notable 的更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)，
并且本项目遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [1.0.0] - 2026-04-20

### 新增
- 初始版本发布
- JavaScript 工具函数库
  - `array-utils.js` - 数组操作工具（去重、扁平化、分组、排序等）
  - `date-utils.js` - 日期时间处理工具（格式化、解析、计算等）
  - `string-utils.js` - 字符串处理工具（掩码、随机码、验证等）
  - `storage-utils.js` - localStorage 封装工具
  - `validate-utils.js` - 表单验证工具
- Python 工具函数库
  - `time_utils.py` - 时间日期处理工具
  - `file_utils.py` - 文件操作工具
  - `utils.py` - 通用工具函数（哈希、随机字符串、重试装饰器等）
- 完整的类型定义文件 (TypeScript)
- 单元测试覆盖
- GitHub Actions CI/CD 工作流

### 特性
- 支持 ES6+ 模块化导入
- 完整的 JSDoc/文档字符串文档
- TypeScript 类型支持
- 零依赖（核心功能）
- 跨平台兼容

[1.0.0]: https://github.com/Mscynol/dev-utils-toolkit/releases/tag/v1.0.0

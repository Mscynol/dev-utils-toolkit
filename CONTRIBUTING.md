# 贡献指南

感谢你对 dev-utils-toolkit 的兴趣！我们欢迎所有形式的贡献。

## 如何贡献

### 报告问题

如果你发现了 bug 或有功能建议，请通过 [GitHub Issues](https://github.com/Mscynol/dev-utils-toolkit/issues) 提交。

提交问题时请包含：
- 问题的清晰描述
- 重现步骤（如果是 bug）
- 预期行为与实际行为
- 环境信息（Node.js/Python 版本、操作系统等）

### 提交代码

1. Fork 本仓库
2. 创建你的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

### 开发规范

#### JavaScript
- 使用 ES6+ 语法
- 为所有函数添加 JSDoc 注释
- 确保代码通过 ESLint 检查
- 为新功能添加测试

#### Python
- 遵循 PEP 8 规范
- 为所有函数添加文档字符串
- 使用类型注解（尽可能）
- 为新功能添加测试

### 代码审查

所有提交都需要通过：
- 代码审查
- 自动化测试
- 静态代码分析

## 开发环境设置

### JavaScript

```bash
npm install
npm test
npm run lint
```

### Python

```bash
pip install -e .
python -m pytest
```

## 许可证

通过提交代码，你同意你的贡献将遵循 MIT 许可证。

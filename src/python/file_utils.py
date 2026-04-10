import os
import json

def read_file(path):
    """读取文本文件"""
    if not os.path.exists(path):
        return None
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    """写入文本文件"""
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def read_json(path):
    """读取 JSON 文件"""
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def write_json(path, data):
    """写入 JSON 文件"""
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def get_file_size(path):
    """获取文件大小"""
    if not os.path.exists(path):
        return 0
    return os.path.getsize(path)
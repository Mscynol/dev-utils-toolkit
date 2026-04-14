import os
import json
import shutil
import glob
from pathlib import Path
from typing import List, Optional, Dict, Any, Iterator
from datetime import datetime


def read_file(path: str, encoding: str = 'utf-8') -> Optional[str]:
    """读取文本文件"""
    if not os.path.exists(path):
        return None
    with open(path, 'r', encoding=encoding) as f:
        return f.read()


def write_file(path: str, content: str, encoding: str = 'utf-8') -> None:
    """写入文本文件"""
    # 确保目录存在
    ensure_dir(os.path.dirname(path))
    with open(path, 'w', encoding=encoding) as f:
        f.write(content)


def read_binary(path: str) -> Optional[bytes]:
    """读取二进制文件"""
    if not os.path.exists(path):
        return None
    with open(path, 'rb') as f:
        return f.read()


def write_binary(path: str, content: bytes) -> None:
    """写入二进制文件"""
    ensure_dir(os.path.dirname(path))
    with open(path, 'wb') as f:
        f.write(content)


def read_lines(path: str, encoding: str = 'utf-8') -> List[str]:
    """读取文件为行列表"""
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding=encoding) as f:
        return [line.rstrip('\n') for line in f]


def write_lines(path: str, lines: List[str], encoding: str = 'utf-8') -> None:
    """写入行列表到文件"""
    ensure_dir(os.path.dirname(path))
    with open(path, 'w', encoding=encoding) as f:
        f.write('\n'.join(lines))


def append_file(path: str, content: str, encoding: str = 'utf-8') -> None:
    """追加内容到文件"""
    ensure_dir(os.path.dirname(path))
    with open(path, 'a', encoding=encoding) as f:
        f.write(content)


def read_json(path: str, default: Any = None) -> Any:
    """读取 JSON 文件"""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return default


def write_json(path: str, data: Any, indent: int = 2, ensure_ascii: bool = False) -> None:
    """写入 JSON 文件"""
    ensure_dir(os.path.dirname(path))
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=indent, ensure_ascii=ensure_ascii)


def read_jsonl(path: str) -> Iterator[Dict]:
    """读取 JSONL 文件（每行一个 JSON 对象）"""
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line:
                try:
                    yield json.loads(line)
                except json.JSONDecodeError:
                    continue


def write_jsonl(path: str, data: Iterator[Dict]) -> None:
    """写入 JSONL 文件"""
    ensure_dir(os.path.dirname(path))
    with open(path, 'w', encoding='utf-8') as f:
        for item in data:
            f.write(json.dumps(item, ensure_ascii=False) + '\n')


def get_file_size(path: str) -> int:
    """获取文件大小（字节）"""
    if not os.path.exists(path):
        return 0
    return os.path.getsize(path)


def get_file_size_readable(path: str) -> str:
    """获取可读的文件大小"""
    size = get_file_size(path)
    return format_file_size(size)


def format_file_size(size: int) -> str:
    """格式化文件大小"""
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if size < 1024.0:
            return f"{size:.2f} {unit}"
        size /= 1024.0
    return f"{size:.2f} PB"


def get_file_modified_time(path: str) -> Optional[datetime]:
    """获取文件修改时间"""
    if not os.path.exists(path):
        return None
    timestamp = os.path.getmtime(path)
    return datetime.fromtimestamp(timestamp)


def get_file_created_time(path: str) -> Optional[datetime]:
    """获取文件创建时间"""
    if not os.path.exists(path):
        return None
    timestamp = os.path.getctime(path)
    return datetime.fromtimestamp(timestamp)


def get_file_extension(path: str) -> str:
    """获取文件扩展名"""
    return os.path.splitext(path)[1].lower()


def get_file_name(path: str) -> str:
    """获取文件名（不含路径）"""
    return os.path.basename(path)


def get_file_name_without_ext(path: str) -> str:
    """获取文件名（不含扩展名）"""
    return os.path.splitext(os.path.basename(path))[0]


def get_dir_name(path: str) -> str:
    """获取目录名"""
    return os.path.dirname(path)


def ensure_dir(path: str) -> None:
    """确保目录存在"""
    if path and not os.path.exists(path):
        os.makedirs(path, exist_ok=True)


def copy_file(src: str, dst: str) -> None:
    """复制文件"""
    ensure_dir(os.path.dirname(dst))
    shutil.copy2(src, dst)


def copy_dir(src: str, dst: str) -> None:
    """复制目录"""
    if os.path.exists(dst):
        shutil.rmtree(dst)
    shutil.copytree(src, dst)


def move_file(src: str, dst: str) -> None:
    """移动文件"""
    ensure_dir(os.path.dirname(dst))
    shutil.move(src, dst)


def delete_file(path: str) -> bool:
    """删除文件"""
    try:
        if os.path.exists(path):
            os.remove(path)
            return True
    except OSError:
        pass
    return False


def delete_dir(path: str) -> bool:
    """删除目录"""
    try:
        if os.path.exists(path):
            shutil.rmtree(path)
            return True
    except OSError:
        pass
    return False


def clean_dir(path: str) -> None:
    """清空目录（保留目录本身）"""
    if not os.path.exists(path):
        return
    for item in os.listdir(path):
        item_path = os.path.join(path, item)
        if os.path.isfile(item_path):
            os.remove(item_path)
        elif os.path.isdir(item_path):
            shutil.rmtree(item_path)


def list_files(path: str, pattern: str = '*', recursive: bool = False) -> List[str]:
    """列出目录中的文件"""
    if not os.path.exists(path):
        return []

    if recursive:
        result = []
        for root, _, files in os.walk(path):
            for file in files:
                if file_matches_pattern(file, pattern):
                    result.append(os.path.join(root, file))
        return result
    else:
        return [os.path.join(path, f) for f in os.listdir(path)
                if os.path.isfile(os.path.join(path, f)) and file_matches_pattern(f, pattern)]


def list_dirs(path: str, recursive: bool = False) -> List[str]:
    """列出目录中的子目录"""
    if not os.path.exists(path):
        return []

    if recursive:
        result = []
        for root, dirs, _ in os.walk(path):
            for dir_name in dirs:
                result.append(os.path.join(root, dir_name))
        return result
    else:
        return [os.path.join(path, d) for d in os.listdir(path)
                if os.path.isdir(os.path.join(path, d))]


def file_matches_pattern(filename: str, pattern: str) -> bool:
    """检查文件名是否匹配模式"""
    import fnmatch
    return fnmatch.fnmatch(filename, pattern)


def find_files(path: str, pattern: str = '*') -> List[str]:
    """使用 glob 查找文件"""
    return glob.glob(os.path.join(path, '**', pattern), recursive=True)


def is_file(path: str) -> bool:
    """检查路径是否为文件"""
    return os.path.isfile(path)


def is_dir(path: str) -> bool:
    """检查路径是否为目录"""
    return os.path.isdir(path)


def is_empty_dir(path: str) -> bool:
    """检查目录是否为空"""
    if not os.path.isdir(path):
        return False
    return len(os.listdir(path)) == 0


def get_file_hash(path: str, algorithm: str = 'md5') -> Optional[str]:
    """计算文件哈希值"""
    import hashlib
    if not os.path.exists(path):
        return None

    hasher = hashlib.new(algorithm)
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b''):
            hasher.update(chunk)
    return hasher.hexdigest()


def get_file_md5(path: str) -> Optional[str]:
    """计算文件 MD5"""
    return get_file_hash(path, 'md5')


def get_file_sha256(path: str) -> Optional[str]:
    """计算文件 SHA256"""
    return get_file_hash(path, 'sha256')


def files_are_equal(path1: str, path2: str) -> bool:
    """比较两个文件是否相同（使用哈希）"""
    hash1 = get_file_md5(path1)
    hash2 = get_file_md5(path2)
    return hash1 is not None and hash2 is not None and hash1 == hash2


def touch_file(path: str) -> None:
    """创建空文件或更新文件时间戳"""
    ensure_dir(os.path.dirname(path))
    Path(path).touch()


def safe_filename(filename: str, replacement: str = '_') -> str:
    """生成安全的文件名"""
    import re
    # 替换非法字符
    filename = re.sub(r'[<>:"/\\|?*]', replacement, filename)
    # 去除控制字符
    filename = ''.join(char for char in filename if ord(char) >= 32)
    # 去除首尾空格和点
    filename = filename.strip('. ')
    return filename or 'unnamed'


def split_path(path: str) -> tuple:
    """拆分路径为 (目录, 文件名, 扩展名)"""
    dir_name = os.path.dirname(path)
    base_name = os.path.basename(path)
    name, ext = os.path.splitext(base_name)
    return dir_name, name, ext


def join_path(*parts: str) -> str:
    """拼接路径"""
    return os.path.join(*parts)


def get_absolute_path(path: str) -> str:
    """获取绝对路径"""
    return os.path.abspath(path)


def get_relative_path(path: str, start: str = '.') -> str:
    """获取相对路径"""
    return os.path.relpath(path, start)


def normalize_path(path: str) -> str:
    """规范化路径"""
    return os.path.normpath(path)


def expand_user(path: str) -> str:
    """展开用户目录 (~)"""
    return os.path.expanduser(path)


def get_temp_dir() -> str:
    """获取临时目录"""
    import tempfile
    return tempfile.gettempdir()


def create_temp_file(suffix: str = '', prefix: str = 'tmp', delete: bool = False) -> str:
    """创建临时文件"""
    import tempfile
    fd, path = tempfile.mkstemp(suffix=suffix, prefix=prefix)
    os.close(fd)
    if delete:
        os.remove(path)
    return path


def create_temp_dir(suffix: str = '', prefix: str = 'tmp') -> str:
    """创建临时目录"""
    import tempfile
    return tempfile.mkdtemp(suffix=suffix, prefix=prefix)


def get_file_info(path: str) -> Dict[str, Any]:
    """获取文件详细信息"""
    if not os.path.exists(path):
        return {}

    stat = os.stat(path)
    return {
        'name': get_file_name(path),
        'path': os.path.abspath(path),
        'size': stat.st_size,
        'size_readable': format_file_size(stat.st_size),
        'created': datetime.fromtimestamp(stat.st_ctime),
        'modified': datetime.fromtimestamp(stat.st_mtime),
        'accessed': datetime.fromtimestamp(stat.st_atime),
        'is_file': os.path.isfile(path),
        'is_dir': os.path.isdir(path),
        'extension': get_file_extension(path),
        'permissions': oct(stat.st_mode)[-3:],
    }


def read_csv(path: str, delimiter: str = ',', encoding: str = 'utf-8') -> List[Dict]:
    """读取 CSV 文件"""
    import csv
    if not os.path.exists(path):
        return []

    with open(path, 'r', encoding=encoding, newline='') as f:
        reader = csv.DictReader(f, delimiter=delimiter)
        return list(reader)


def write_csv(path: str, data: List[Dict], fieldnames: List[str] = None, encoding: str = 'utf-8') -> None:
    """写入 CSV 文件"""
    import csv
    if not data:
        return

    ensure_dir(os.path.dirname(path))
    if fieldnames is None:
        fieldnames = list(data[0].keys())

    with open(path, 'w', encoding=encoding, newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)


def read_yaml(path: str) -> Any:
    """读取 YAML 文件"""
    try:
        import yaml
        with open(path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    except ImportError:
        raise ImportError("PyYAML is required. Install it with: pip install pyyaml")
    except FileNotFoundError:
        return None


def write_yaml(path: str, data: Any) -> None:
    """写入 YAML 文件"""
    try:
        import yaml
        ensure_dir(os.path.dirname(path))
        with open(path, 'w', encoding='utf-8') as f:
            yaml.dump(data, f, default_flow_style=False, allow_unicode=True)
    except ImportError:
        raise ImportError("PyYAML is required. Install it with: pip install pyyaml")


def read_env_file(path: str = '.env') -> Dict[str, str]:
    """读取 .env 文件"""
    env_vars = {}
    if not os.path.exists(path):
        return env_vars

    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                env_vars[key] = value.strip('"\'')
    return env_vars


def write_env_file(env_vars: Dict[str, str], path: str = '.env') -> None:
    """写入 .env 文件"""
    lines = [f'{key}={value}' for key, value in env_vars.items()]
    write_file(path, '\n'.join(lines))


def zip_files(zip_path: str, files: List[str], base_dir: str = None) -> None:
    """压缩文件"""
    import zipfile
    ensure_dir(os.path.dirname(zip_path))
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for file in files:
            arcname = os.path.relpath(file, base_dir) if base_dir else os.path.basename(file)
            zf.write(file, arcname)


def unzip_file(zip_path: str, extract_dir: str = None) -> None:
    """解压文件"""
    import zipfile
    with zipfile.ZipFile(zip_path, 'r') as zf:
        zf.extractall(extract_dir)


def gzip_file(src_path: str, dst_path: str = None) -> str:
    """Gzip 压缩文件"""
    import gzip
    if dst_path is None:
        dst_path = src_path + '.gz'
    ensure_dir(os.path.dirname(dst_path))
    with open(src_path, 'rb') as f_in:
        with gzip.open(dst_path, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
    return dst_path


def gunzip_file(src_path: str, dst_path: str = None) -> str:
    """Gzip 解压文件"""
    import gzip
    if dst_path is None:
        dst_path = src_path.replace('.gz', '')
    ensure_dir(os.path.dirname(dst_path))
    with gzip.open(src_path, 'rb') as f_in:
        with open(dst_path, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
    return dst_path


def tar_files(tar_path: str, files: List[str], base_dir: str = None) -> None:
    """创建 tar 归档"""
    import tarfile
    ensure_dir(os.path.dirname(tar_path))
    with tarfile.open(tar_path, 'w') as tar:
        for file in files:
            arcname = os.path.relpath(file, base_dir) if base_dir else os.path.basename(file)
            tar.add(file, arcname)


def untar_file(tar_path: str, extract_dir: str = None) -> None:
    """解压 tar 归档"""
    import tarfile
    with tarfile.open(tar_path, 'r') as tar:
        tar.extractall(extract_dir)


def is_binary_file(path: str, sample_size: int = 1024) -> bool:
    """检测文件是否为二进制文件"""
    if not os.path.exists(path):
        return False
    with open(path, 'rb') as f:
        chunk = f.read(sample_size)
    return b'\x00' in chunk


def count_lines(path: str, encoding: str = 'utf-8') -> int:
    """统计文件行数"""
    if not os.path.exists(path):
        return 0
    with open(path, 'r', encoding=encoding) as f:
        return sum(1 for _ in f)


def count_code_lines(path: str, encoding: str = 'utf-8') -> Dict[str, int]:
    """统计代码文件行数（代码、注释、空行）"""
    if not os.path.exists(path):
        return {'total': 0, 'code': 0, 'comment': 0, 'blank': 0}

    ext = get_file_extension(path)
    comment_patterns = {
        '.py': '#',
        '.js': '//',
        '.ts': '//',
        '.java': '//',
        '.c': '//',
        '.cpp': '//',
        '.go': '//',
        '.rs': '//',
    }

    comment_char = comment_patterns.get(ext, '#')
    total = code = comment = blank = 0

    with open(path, 'r', encoding=encoding) as f:
        for line in f:
            total += 1
            stripped = line.strip()
            if not stripped:
                blank += 1
            elif stripped.startswith(comment_char):
                comment += 1
            else:
                code += 1

    return {'total': total, 'code': code, 'comment': comment, 'blank': blank}
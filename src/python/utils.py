"""
通用工具函数库
"""

import hashlib
import random
import string
from typing import Any, Dict, List, Optional, Union


def md5(text: str) -> str:
    """计算字符串的 MD5 哈希值"""
    return hashlib.md5(text.encode('utf-8')).hexdigest()


def sha256(text: str) -> str:
    """计算字符串的 SHA256 哈希值"""
    return hashlib.sha256(text.encode('utf-8')).hexdigest()


def random_string(length: int = 8, chars: str = string.ascii_letters + string.digits) -> str:
    """生成随机字符串"""
    return ''.join(random.choices(chars, k=length))


def random_code(length: int = 6) -> str:
    """生成随机数字验证码"""
    return ''.join(random.choices(string.digits, k=length))


def chunk_list(lst: List[Any], size: int) -> List[List[Any]]:
    """将列表分割成指定大小的块"""
    return [lst[i:i + size] for i in range(0, len(lst), size)]


def dict_get(d: Dict, key: str, default: Any = None) -> Any:
    """安全获取字典值，支持嵌套键（如 'a.b.c'）"""
    keys = key.split('.')
    value = d
    for k in keys:
        if isinstance(value, dict) and k in value:
            value = value[k]
        else:
            return default
    return value


def truncate(text: str, length: int, suffix: str = '...') -> str:
    """截断字符串到指定长度"""
    if len(text) <= length:
        return text
    return text[:length - len(suffix)] + suffix


def camel_to_snake(name: str) -> str:
    """驼峰命名转下划线命名"""
    result = []
    for i, char in enumerate(name):
        if char.isupper() and i > 0:
            result.append('_')
        result.append(char.lower())
    return ''.join(result)


def snake_to_camel(name: str) -> str:
    """下划线命名转驼峰命名"""
    parts = name.split('_')
    return parts[0] + ''.join(word.capitalize() for word in parts[1:])


def mask_string(text: str, start: int = 3, end: int = 3, mask: str = '*') -> str:
    """遮盖字符串中间部分（如手机号、身份证号）"""
    if len(text) <= start + end:
        return text
    return text[:start] + mask * (len(text) - start - end) + text[-end:]


def unique_list(lst: List[Any]) -> List[Any]:
    """列表去序，保持顺序"""
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result


def retry(max_attempts: int = 3, exceptions: tuple = (Exception,)):
    """装饰器：失败重试"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts - 1:
                        raise e
        return wrapper
    return decorator


def throttle(seconds: float):
    """装饰器：函数节流"""
    def decorator(func):
        last_call = 0
        def wrapper(*args, **kwargs):
            nonlocal last_call
            import time
            now = time.time()
            if now - last_call >= seconds:
                last_call = now
                return func(*args, **kwargs)
        return wrapper
    return decorator

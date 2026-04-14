"""
通用工具函数库
"""

import hashlib
import random
import re
import string
import time
import uuid
from datetime import datetime, timedelta
from functools import wraps
from typing import Any, Callable, Dict, List, Optional, Set, Tuple, Union


def md5(text: str) -> str:
    """计算字符串的 MD5 哈希值"""
    return hashlib.md5(text.encode('utf-8')).hexdigest()


def sha256(text: str) -> str:
    """计算字符串的 SHA256 哈希值"""
    return hashlib.sha256(text.encode('utf-8')).hexdigest()


def sha1(text: str) -> str:
    """计算字符串的 SHA1 哈希值"""
    return hashlib.sha1(text.encode('utf-8')).hexdigest()


def sha512(text: str) -> str:
    """计算字符串的 SHA512 哈希值"""
    return hashlib.sha512(text.encode('utf-8')).hexdigest()


def random_string(length: int = 8, chars: str = string.ascii_letters + string.digits) -> str:
    """生成随机字符串"""
    return ''.join(random.choices(chars, k=length))


def random_code(length: int = 6) -> str:
    """生成随机数字验证码"""
    return ''.join(random.choices(string.digits, k=length))


def random_uuid() -> str:
    """生成 UUID"""
    return str(uuid.uuid4())


def random_uuid_hex() -> str:
    """生成 UUID (hex 格式)"""
    return uuid.uuid4().hex


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


def dict_set(d: Dict, key: str, value: Any) -> None:
    """安全设置字典值，支持嵌套键"""
    keys = key.split('.')
    target = d
    for k in keys[:-1]:
        if k not in target:
            target[k] = {}
        target = target[k]
    target[keys[-1]] = value


def dict_merge(*dicts: Dict) -> Dict:
    """合并多个字典"""
    result = {}
    for d in dicts:
        result.update(d)
    return result


def dict_filter(d: Dict, keys: List[str]) -> Dict:
    """过滤字典，只保留指定键"""
    return {k: v for k, v in d.items() if k in keys}


def dict_omit(d: Dict, keys: List[str]) -> Dict:
    """排除字典中的指定键"""
    return {k: v for k, v in d.items() if k not in keys}


def dict_invert(d: Dict) -> Dict:
    """反转字典（键值互换）"""
    return {v: k for k, v in d.items()}


def dict_pick_by(d: Dict, predicate: Callable[[Any], bool]) -> Dict:
    """根据条件筛选字典"""
    return {k: v for k, v in d.items() if predicate(v)}


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


def snake_to_pascal(name: str) -> str:
    """下划线命名转帕斯卡命名"""
    return ''.join(word.capitalize() for word in name.split('_'))


def pascal_to_snake(name: str) -> str:
    """帕斯卡命名转下划线命名"""
    return camel_to_snake(name)


def kebab_to_snake(name: str) -> str:
    """短横线命名转下划线命名"""
    return name.replace('-', '_')


def snake_to_kebab(name: str) -> str:
    """下划线命名转短横线命名"""
    return name.replace('_', '-')


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


def flatten(lst: List[Any]) -> List[Any]:
    """展平列表"""
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result


def flatten_once(lst: List[Any]) -> List[Any]:
    """展平列表一级"""
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(item)
        else:
            result.append(item)
    return result


def group_by(lst: List[Dict], key: str) -> Dict[str, List[Dict]]:
    """按指定键对字典列表分组"""
    result = {}
    for item in lst:
        k = item.get(key)
        if k not in result:
            result[k] = []
        result[k].append(item)
    return result


def pluck(lst: List[Dict], key: str) -> List[Any]:
    """提取字典列表中的指定键值"""
    return [item.get(key) for item in lst]


def sort_by(lst: List[Dict], key: str, reverse: bool = False) -> List[Dict]:
    """按指定键对字典列表排序"""
    return sorted(lst, key=lambda x: x.get(key), reverse=reverse)


def find(lst: List[Any], predicate: Callable[[Any], bool]) -> Optional[Any]:
    """查找第一个符合条件的元素"""
    for item in lst:
        if predicate(item):
            return item
    return None


def find_index(lst: List[Any], predicate: Callable[[Any], bool]) -> int:
    """查找第一个符合条件的元素索引"""
    for i, item in enumerate(lst):
        if predicate(item):
            return i
    return -1


def compact(lst: List[Any]) -> List[Any]:
    """去除列表中的假值"""
    return [x for x in lst if x]


def difference(lst1: List[Any], lst2: List[Any]) -> List[Any]:
    """获取 lst1 中不在 lst2 中的元素"""
    set2 = set(lst2)
    return [x for x in lst1 if x not in set2]


def intersection(lst1: List[Any], lst2: List[Any]) -> List[Any]:
    """获取两个列表的交集"""
    set2 = set(lst2)
    return [x for x in lst1 if x in set2]


def union(lst1: List[Any], lst2: List[Any]) -> List[Any]:
    """获取两个列表的并集"""
    return list(set(lst1) | set(lst2))


def shuffle(lst: List[Any]) -> List[Any]:
    """随机打乱列表"""
    result = lst.copy()
    random.shuffle(result)
    return result


def sample(lst: List[Any], k: int = 1) -> List[Any]:
    """从列表中随机抽取 k 个元素"""
    return random.sample(lst, min(k, len(lst)))


def retry(max_attempts: int = 3, exceptions: tuple = (Exception,), delay: float = 0):
    """装饰器：失败重试"""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts - 1:
                        raise e
                    if delay > 0:
                        time.sleep(delay)
        return wrapper
    return decorator


def throttle(seconds: float):
    """装饰器：函数节流"""
    def decorator(func: Callable) -> Callable:
        last_call = 0
        @wraps(func)
        def wrapper(*args, **kwargs):
            nonlocal last_call
            now = time.time()
            if now - last_call >= seconds:
                last_call = now
                return func(*args, **kwargs)
        return wrapper
    return decorator


def debounce(wait: float, immediate: bool = False):
    """装饰器：函数防抖"""
    def decorator(func: Callable) -> Callable:
        timer = None
        @wraps(func)
        def wrapper(*args, **kwargs):
            nonlocal timer
            def call_it():
                func(*args, **kwargs)

            if timer is not None:
                timer.cancel()

            if immediate and timer is None:
                func(*args, **kwargs)

            timer = Timer(wait, call_it)
            timer.start()
        return wrapper
    return decorator


class Timer:
    """简单的定时器实现"""
    def __init__(self, interval: float, function: Callable, *args, **kwargs):
        self.interval = interval
        self.function = function
        self.args = args
        self.kwargs = kwargs
        self.timer = None

    def start(self):
        self.timer = threading.Timer(self.interval, self.function, self.args, self.kwargs)
        self.timer.start()

    def cancel(self):
        if self.timer:
            self.timer.cancel()


import threading


def memoize(func: Callable) -> Callable:
    """装饰器：函数记忆化"""
    cache = {}
    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    wrapper.cache = cache
    return wrapper


def ttl_cache(ttl: float = 60):
    """装饰器：带过期时间的缓存"""
    def decorator(func: Callable) -> Callable:
        cache = {}
        @wraps(func)
        def wrapper(*args):
            now = time.time()
            if args in cache:
                value, expiry = cache[args]
                if now < expiry:
                    return value
            value = func(*args)
            cache[args] = (value, now + ttl)
            return value
        return wrapper
    return decorator


def lru_cache(maxsize: int = 128):
    """简单的 LRU 缓存实现"""
    def decorator(func: Callable) -> Callable:
        cache = {}
        order = []
        @wraps(func)
        def wrapper(*args):
            if args in cache:
                order.remove(args)
                order.append(args)
                return cache[args]
            result = func(*args)
            cache[args] = result
            order.append(args)
            if len(order) > maxsize:
                oldest = order.pop(0)
                del cache[oldest]
            return result
        return wrapper
    return decorator


def rate_limit(max_calls: int, period: float):
    """装饰器：限流"""
    def decorator(func: Callable) -> Callable:
        calls = []
        @wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            calls[:] = [c for c in calls if now - c < period]
            if len(calls) >= max_calls:
                raise RuntimeError("Rate limit exceeded")
            calls.append(now)
            return func(*args, **kwargs)
        return wrapper
    return decorator


def is_email(email: str) -> bool:
    """验证邮箱格式"""
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(pattern, email))


def is_phone(phone: str) -> bool:
    """验证中国手机号格式"""
    pattern = r'^1[3-9]\d{9}$'
    return bool(re.match(pattern, phone))


def is_url(url: str) -> bool:
    """验证 URL 格式"""
    pattern = r'^https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+[^\s]*$'
    return bool(re.match(pattern, url))


def is_ip(ip: str) -> bool:
    """验证 IP 地址格式"""
    pattern = r'^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
    return bool(re.match(pattern, ip))


def is_id_card(id_card: str) -> bool:
    """验证中国身份证号"""
    pattern = r'(^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x)$))'
    if not re.match(pattern, id_card):
        return False

    if len(id_card) == 18:
        weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        check_codes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
        sum_val = sum(int(id_card[i]) * weights[i] for i in range(17))
        return id_card[17].upper() == check_codes[sum_val % 11]
    return True


def to_camel_case(text: str) -> str:
    """字符串转驼峰命名"""
    words = re.split(r'[_\-]+', text)
    return words[0] + ''.join(word.capitalize() for word in words[1:])


def to_snake_case(text: str) -> str:
    """字符串转蛇形命名"""
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', text)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


def to_kebab_case(text: str) -> str:
    """字符串转短横线命名"""
    return to_snake_case(text).replace('_', '-')


def escape_html(text: str) -> str:
    """转义 HTML 特殊字符"""
    html_escapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }
    return ''.join(html_escapes.get(c, c) for c in text)


def unescape_html(text: str) -> str:
    """反转义 HTML 特殊字符"""
    html_unescapes = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'"
    }
    for k, v in html_unescapes.items():
        text = text.replace(k, v)
    return text


def remove_punctuation(text: str) -> str:
    """移除字符串中的标点符号"""
    return re.sub(r'[^\w\s]', '', text)


def extract_numbers(text: str) -> List[str]:
    """提取字符串中的所有数字"""
    return re.findall(r'\d+', text)


def extract_emails(text: str) -> List[str]:
    """提取字符串中的所有邮箱地址"""
    pattern = r'[\w\.-]+@[\w\.-]+\.\w+'
    return re.findall(pattern, text)


def extract_urls(text: str) -> List[str]:
    """提取字符串中的所有 URL"""
    pattern = r'https?://[^\s]+'
    return re.findall(pattern, text)


def remove_duplicates(text: str) -> str:
    """移除字符串中的重复字符"""
    seen = set()
    result = []
    for char in text:
        if char not in seen:
            seen.add(char)
            result.append(char)
    return ''.join(result)


def is_chinese(text: str) -> bool:
    """判断字符串是否全为中文"""
    return bool(re.match(r'^[\u4e00-\u9fa5]+$', text))


def has_chinese(text: str) -> bool:
    """判断字符串是否包含中文"""
    return bool(re.search(r'[\u4e00-\u9fa5]', text))


def count_words(text: str) -> int:
    """计算字符串中的单词数"""
    return len(text.split())


def reading_time(text: str, words_per_minute: int = 200) -> int:
    """估算阅读时间（分钟）"""
    return max(1, round(count_words(text) / words_per_minute))


def reverse_string(text: str) -> str:
    """反转字符串"""
    return text[::-1]


def is_palindrome(text: str) -> bool:
    """判断字符串是否为回文"""
    cleaned = re.sub(r'[^\w]', '', text.lower())
    return cleaned == cleaned[::-1]


def pad_start(text: str, length: int, pad: str = ' ') -> str:
    """字符串左侧填充"""
    return text.rjust(length, pad)


def pad_end(text: str, length: int, pad: str = ' ') -> str:
    """字符串右侧填充"""
    return text.ljust(length, pad)


def format_number(num: Union[int, float], decimals: int = 0) -> str:
    """格式化数字，添加千位分隔符"""
    return f"{num:,.{decimals}f}"


def to_chinese_number(num: int) -> str:
    """数字转中文"""
    chinese_nums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    chinese_units = ['', '十', '百', '千', '万', '十', '百', '千', '亿']

    if num == 0:
        return chinese_nums[0]

    result = []
    num_str = str(num)
    length = len(num_str)

    for i, digit in enumerate(num_str):
        d = int(digit)
        pos = length - i - 1

        if d != 0:
            result.append(chinese_nums[d])
            result.append(chinese_units[pos])
        else:
            if result and result[-1] != chinese_nums[0]:
                result.append(chinese_nums[0])

    return ''.join(result).rstrip(chinese_nums[0])


def is_leap_year(year: int) -> bool:
    """判断是否为闰年"""
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)


def days_in_month(year: int, month: int) -> int:
    """获取某月的天数"""
    if month in [1, 3, 5, 7, 8, 10, 12]:
        return 31
    elif month in [4, 6, 9, 11]:
        return 30
    elif month == 2:
        return 29 if is_leap_year(year) else 28
    return 0


def get_age(birth_date: datetime) -> int:
    """计算年龄"""
    today = datetime.now()
    age = today.year - birth_date.year
    if (today.month, today.day) < (birth_date.month, birth_date.day):
        age -= 1
    return age


def date_range(start: datetime, end: datetime, step: timedelta = timedelta(days=1)) -> List[datetime]:
    """生成日期范围"""
    dates = []
    current = start
    while current <= end:
        dates.append(current)
        current += step
    return dates


def chunk_string(text: str, size: int) -> List[str]:
    """将字符串分割成指定大小的块"""
    return [text[i:i+size] for i in range(0, len(text), size)]


def remove_accents(text: str) -> str:
    """移除字符串中的重音符号"""
    import unicodedata
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')


def slugify(text: str) -> str:
    """将字符串转换为 URL 友好的 slug"""
    text = remove_accents(text.lower())
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text).strip('-')
    return text


def base64_encode(text: str) -> str:
    """Base64 编码"""
    import base64
    return base64.b64encode(text.encode('utf-8')).decode('utf-8')


def base64_decode(text: str) -> str:
    """Base64 解码"""
    import base64
    return base64.b64decode(text.encode('utf-8')).decode('utf-8')


def capitalize_words(text: str) -> str:
    """每个单词首字母大写"""
    return ' '.join(word.capitalize() for word in text.split())


def clean_whitespace(text: str) -> str:
    """清理字符串中的多余空白"""
    return ' '.join(text.split())


def strip_heredoc(text: str) -> str:
    """清理 heredoc 字符串的缩进"""
    lines = text.splitlines()
    if not lines:
        return text

    min_indent = float('inf')
    for line in lines[1:]:
        stripped = line.lstrip()
        if stripped:
            min_indent = min(min_indent, len(line) - len(stripped))

    if min_indent == float('inf'):
        return text

    lines[0] = lines[0].lstrip()
    for i in range(1, len(lines)):
        lines[i] = lines[i][min_indent:]

    return '\n'.join(lines).strip()


def random_hex_color() -> str:
    """生成随机十六进制颜色"""
    return '#{:06x}'.format(random.randint(0, 0xFFFFFF))


def rgb_to_hex(r: int, g: int, b: int) -> str:
    """RGB 转十六进制"""
    return '#{:02x}{:02x}{:02x}'.format(r, g, b)


def hex_to_rgb(hex_color: str) -> Tuple[int, int, int]:
    """十六进制转 RGB"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def clamp(value: Union[int, float], min_val: Union[int, float], max_val: Union[int, float]) -> Union[int, float]:
    """限制数值范围"""
    return max(min_val, min(max_val, value))


def lerp(start: float, end: float, t: float) -> float:
    """线性插值"""
    return start + (end - start) * clamp(t, 0, 1)


def map_range(value: float, in_min: float, in_max: float, out_min: float, out_max: float) -> float:
    """将一个范围的值映射到另一个范围"""
    return out_min + (value - in_min) * (out_max - out_min) / (in_max - in_min)


def is_prime(n: int) -> bool:
    """判断是否为质数"""
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True


def gcd(a: int, b: int) -> int:
    """最大公约数"""
    while b:
        a, b = b, a % b
    return a


def lcm(a: int, b: int) -> int:
    """最小公倍数"""
    return abs(a * b) // gcd(a, b)


def factors(n: int) -> List[int]:
    """获取一个数的所有因数"""
    result = []
    for i in range(1, int(n**0.5) + 1):
        if n % i == 0:
            result.append(i)
            if i != n // i:
                result.append(n // i)
    return sorted(result)


def binary_search(arr: List[Any], target: Any) -> int:
    """二分查找"""
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1


def quick_sort(arr: List[Any]) -> List[Any]:
    """快速排序"""
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)


def merge_sort(arr: List[Any]) -> List[Any]:
    """归并排序"""
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return _merge(left, right)


def _merge(left: List[Any], right: List[Any]) -> List[Any]:
    """合并两个有序列表"""
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result


class FrozenDict(dict):
    """不可变字典"""
    def __hash__(self):
        return hash(tuple(sorted(self.items())))

    def __setitem__(self, *args, **kwargs):
        raise TypeError("'FrozenDict' object does not support item assignment")

    def __delitem__(self, *args, **kwargs):
        raise TypeError("'FrozenDict' object does not support item deletion")


class DefaultDict(dict):
    """带默认值的字典"""
    def __init__(self, default_factory=None):
        super().__init__()
        self.default_factory = default_factory

    def __missing__(self, key):
        if self.default_factory is None:
            raise KeyError(key)
        value = self.default_factory()
        self[key] = value
        return value


class Counter:
    """计数器"""
    def __init__(self, items: List[Any] = None):
        self._data = {}
        if items:
            for item in items:
                self._data[item] = self._data.get(item, 0) + 1

    def __getitem__(self, item):
        return self._data.get(item, 0)

    def __setitem__(self, item, value):
        self._data[item] = value

    def most_common(self, n: int = None) -> List[Tuple[Any, int]]:
        """获取最常见的 n 个元素"""
        items = sorted(self._data.items(), key=lambda x: x[1], reverse=True)
        return items[:n] if n else items

    def elements(self) -> List[Any]:
        """获取所有元素（按计数展开）"""
        result = []
        for item, count in self._data.items():
            result.extend([item] * count)
        return result

    def update(self, items: List[Any]):
        """更新计数"""
        for item in items:
            self._data[item] = self._data.get(item, 0) + 1


class CircularBuffer:
    """循环缓冲区"""
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.buffer = [None] * capacity
        self.head = 0
        self.size = 0

    def append(self, item):
        """添加元素"""
        self.buffer[self.head] = item
        self.head = (self.head + 1) % self.capacity
        self.size = min(self.size + 1, self.capacity)

    def __iter__(self):
        """迭代缓冲区"""
        for i in range(self.size):
            idx = (self.head - self.size + i) % self.capacity
            yield self.buffer[idx]

    def __len__(self):
        return self.size

    def to_list(self) -> List[Any]:
        """转换为列表"""
        return list(self)


class PriorityQueue:
    """优先队列"""
    def __init__(self):
        self._queue = []

    def push(self, item: Any, priority: int):
        """添加元素"""
        import heapq
        heapq.heappush(self._queue, (priority, item))

    def pop(self) -> Any:
        """弹出优先级最高的元素"""
        import heapq
        return heapq.heappop(self._queue)[1]

    def peek(self) -> Any:
        """查看优先级最高的元素"""
        return self._queue[0][1]

    def __len__(self):
        return len(self._queue)

    def is_empty(self) -> bool:
        """是否为空"""
        return len(self._queue) == 0


class Singleton:
    """单例模式基类"""
    _instances = {}

    def __new__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__new__(cls)
        return cls._instances[cls]


def singleton(cls: Callable) -> Callable:
    """单例装饰器"""
    instances = {}
    @wraps(cls)
    def wrapper(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return wrapper


class LazyProperty:
    """惰性属性装饰器"""
    def __init__(self, func):
        self.func = func
        self.name = func.__name__

    def __get__(self, instance, owner):
        if instance is None:
            return self
        value = self.func(instance)
        setattr(instance, self.name, value)
        return value


def timing(func: Callable) -> Callable:
    """计时装饰器"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} took {elapsed:.4f} seconds")
        return result
    return wrapper


def count_calls(func: Callable) -> Callable:
    """计数装饰器"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper


def deprecated(message: str = ""):
    """弃用装饰器"""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            import warnings
            warnings.warn(
                f"{func.__name__} is deprecated. {message}",
                DeprecationWarning,
                stacklevel=2
            )
            return func(*args, **kwargs)
        return wrapper
    return decorator


def deep_merge(dict1: Dict, dict2: Dict) -> Dict:
    """深度合并两个字典"""
    result = dict1.copy()
    for key, value in dict2.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result


def pick(obj: Dict, keys: List[str]) -> Dict:
    """从对象中选取指定键"""
    return {k: obj[k] for k in keys if k in obj}


def omit(obj: Dict, keys: List[str]) -> Dict:
    """从对象中排除指定键"""
    return {k: v for k, v in obj.items() if k not in keys}


def get_type_name(obj: Any) -> str:
    """获取对象的类型名称"""
    return type(obj).__name__


def is_iterable(obj: Any) -> bool:
    """判断对象是否可迭代"""
    try:
        iter(obj)
        return True
    except TypeError:
        return False


def flatten_dict(d: Dict, parent_key: str = '', sep: str = '.') -> Dict:
    """展平嵌套字典"""
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep).items())
        else:
            items.append((new_key, v))
    return dict(items)


def unflatten_dict(d: Dict, sep: str = '.') -> Dict:
    """反展平字典"""
    result = {}
    for key, value in d.items():
        keys = key.split(sep)
        target = result
        for k in keys[:-1]:
            if k not in target:
                target[k] = {}
            target = target[k]
        target[keys[-1]] = value
    return result


def safe_json_loads(text: str, default: Any = None) -> Any:
    """安全的 JSON 加载"""
    import json
    try:
        return json.loads(text)
    except (json.JSONDecodeError, TypeError):
        return default


def safe_int(value: Any, default: int = 0) -> int:
    """安全的整数转换"""
    try:
        return int(value)
    except (ValueError, TypeError):
        return default


def safe_float(value: Any, default: float = 0.0) -> float:
    """安全的浮点数转换"""
    try:
        return float(value)
    except (ValueError, TypeError):
        return default


def humanize_bytes(num: int, suffix: str = 'B') -> str:
    """人性化显示字节大小"""
    for unit in ['', 'K', 'M', 'G', 'T', 'P']:
        if abs(num) < 1024.0:
            return f"{num:3.1f}{unit}{suffix}"
        num /= 1024.0
    return f"{num:.1f}E{suffix}"


def humanize_number(num: int) -> str:
    """人性化显示数字"""
    if num >= 1_000_000_000:
        return f"{num / 1_000_000_000:.1f}B"
    elif num >= 1_000_000:
        return f"{num / 1_000_000:.1f}M"
    elif num >= 1_000:
        return f"{num / 1_000:.1f}K"
    return str(num)


def chunk_bytes(data: bytes, size: int) -> List[bytes]:
    """将字节分割成块"""
    return [data[i:i+size] for i in range(0, len(data), size)]


def xor_bytes(a: bytes, b: bytes) -> bytes:
    """对两个字节进行异或操作"""
    return bytes(x ^ y for x, y in zip(a, b))

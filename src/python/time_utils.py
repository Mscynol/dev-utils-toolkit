from datetime import datetime, timedelta, date
from typing import Optional, List, Tuple, Union
import time
import calendar


def now_str(format: str = "%Y-%m-%d %H:%M:%S") -> str:
    """返回当前时间字符串"""
    return datetime.now().strftime(format)


def today() -> str:
    """返回今天日期 YYYY-MM-DD"""
    return datetime.now().strftime("%Y-%m-%d")


def yesterday() -> str:
    """返回昨天日期"""
    return add_days(-1)


def tomorrow() -> str:
    """返回明天日期"""
    return add_days(1)


def add_days(days: int, base_date: str = None) -> str:
    """N天后的日期"""
    if base_date:
        base = datetime.strptime(base_date, "%Y-%m-%d")
    else:
        base = datetime.now()
    d = base + timedelta(days=days)
    return d.strftime("%Y-%m-%d")


def add_hours(hours: int, base_date: datetime = None) -> datetime:
    """N小时后的时间"""
    base = base_date or datetime.now()
    return base + timedelta(hours=hours)


def add_minutes(minutes: int, base_date: datetime = None) -> datetime:
    """N分钟后的时间"""
    base = base_date or datetime.now()
    return base + timedelta(minutes=minutes)


def add_seconds(seconds: int, base_date: datetime = None) -> datetime:
    """N秒后的时间"""
    base = base_date or datetime.now()
    return base + timedelta(seconds=seconds)


def add_months(months: int, base_date: datetime = None) -> datetime:
    """N月后的时间"""
    base = base_date or datetime.now()
    month = base.month - 1 + months
    year = base.year + month // 12
    month = month % 12 + 1
    day = min(base.day, calendar.monthrange(year, month)[1])
    return base.replace(year=year, month=month, day=day)


def add_years(years: int, base_date: datetime = None) -> datetime:
    """N年后的时间"""
    base = base_date or datetime.now()
    try:
        return base.replace(year=base.year + years)
    except ValueError:
        # 处理闰年2月29日的情况
        return base.replace(year=base.year + years, day=28)


def timestamp() -> int:
    """获取当前时间戳（秒）"""
    return int(datetime.now().timestamp())


def timestamp_ms() -> int:
    """获取当前时间戳（毫秒）"""
    return int(datetime.now().timestamp() * 1000)


def timestamp_us() -> int:
    """获取当前时间戳（微秒）"""
    return int(datetime.now().timestamp() * 1000000)


def diff_days(date_str: str) -> int:
    """计算与今天相差天数"""
    d = datetime.strptime(date_str, "%Y-%m-%d")
    return (datetime.now() - d).days


def diff_seconds(date1: Union[str, datetime], date2: Union[str, datetime]) -> int:
    """计算两个日期相差秒数"""
    if isinstance(date1, str):
        date1 = datetime.strptime(date1, "%Y-%m-%d %H:%M:%S")
    if isinstance(date2, str):
        date2 = datetime.strptime(date2, "%Y-%m-%d %H:%M:%S")
    return int((date2 - date1).total_seconds())


def diff_minutes(date1: Union[str, datetime], date2: Union[str, datetime]) -> int:
    """计算两个日期相差分钟数"""
    return diff_seconds(date1, date2) // 60


def diff_hours(date1: Union[str, datetime], date2: Union[str, datetime]) -> int:
    """计算两个日期相差小时数"""
    return diff_seconds(date1, date2) // 3600


def diff_months(date1: Union[str, datetime], date2: Union[str, datetime]) -> int:
    """计算两个日期相差月数"""
    if isinstance(date1, str):
        date1 = datetime.strptime(date1, "%Y-%m-%d")
    if isinstance(date2, str):
        date2 = datetime.strptime(date2, "%Y-%m-%d")
    return (date2.year - date1.year) * 12 + (date2.month - date1.month)


def diff_years(date1: Union[str, datetime], date2: Union[str, datetime]) -> int:
    """计算两个日期相差年数"""
    if isinstance(date1, str):
        date1 = datetime.strptime(date1, "%Y-%m-%d")
    if isinstance(date2, str):
        date2 = datetime.strptime(date2, "%Y-%m-%d")
    return date2.year - date1.year


def format_datetime(dt: Union[str, datetime, int], format: str = "%Y-%m-%d %H:%M:%S") -> str:
    """格式化日期时间"""
    if isinstance(dt, int):
        dt = datetime.fromtimestamp(dt)
    elif isinstance(dt, str):
        dt = datetime.strptime(dt, "%Y-%m-%d %H:%M:%S")
    return dt.strftime(format)


def parse_datetime(date_str: str, format: str = "%Y-%m-%d %H:%M:%S") -> datetime:
    """解析日期时间字符串"""
    return datetime.strptime(date_str, format)


def parse_date(date_str: str, format: str = "%Y-%m-%d") -> date:
    """解析日期字符串"""
    return datetime.strptime(date_str, format).date()


def start_of_day(dt: datetime = None) -> datetime:
    """获取一天的开始时间"""
    base = dt or datetime.now()
    return base.replace(hour=0, minute=0, second=0, microsecond=0)


def end_of_day(dt: datetime = None) -> datetime:
    """获取一天的结束时间"""
    base = dt or datetime.now()
    return base.replace(hour=23, minute=59, second=59, microsecond=999999)


def start_of_week(dt: datetime = None, first_weekday: int = 0) -> datetime:
    """获取一周的开始时间 (first_weekday: 0=周一, 6=周日)"""
    base = dt or datetime.now()
    # Python 的 weekday(): 0=周一, 6=周日
    days_since_start = (base.weekday() - first_weekday) % 7
    return start_of_day(base - timedelta(days=days_since_start))


def end_of_week(dt: datetime = None, first_weekday: int = 0) -> datetime:
    """获取一周的结束时间"""
    return end_of_day(start_of_week(dt, first_weekday) + timedelta(days=6))


def start_of_month(dt: datetime = None) -> datetime:
    """获取一个月的开始时间"""
    base = dt or datetime.now()
    return base.replace(day=1, hour=0, minute=0, second=0, microsecond=0)


def end_of_month(dt: datetime = None) -> datetime:
    """获取一个月的结束时间"""
    base = dt or datetime.now()
    last_day = calendar.monthrange(base.year, base.month)[1]
    return base.replace(day=last_day, hour=23, minute=59, second=59, microsecond=999999)


def start_of_year(dt: datetime = None) -> datetime:
    """获取一年的开始时间"""
    base = dt or datetime.now()
    return base.replace(month=1, day=1, hour=0, minute=0, second=0, microsecond=0)


def end_of_year(dt: datetime = None) -> datetime:
    """获取一年的结束时间"""
    base = dt or datetime.now()
    return base.replace(month=12, day=31, hour=23, minute=59, second=59, microsecond=999999)


def start_of_quarter(dt: datetime = None) -> datetime:
    """获取季度的开始时间"""
    base = dt or datetime.now()
    quarter = (base.month - 1) // 3
    start_month = quarter * 3 + 1
    return base.replace(month=start_month, day=1, hour=0, minute=0, second=0, microsecond=0)


def end_of_quarter(dt: datetime = None) -> datetime:
    """获取季度的结束时间"""
    base = dt or datetime.now()
    quarter = (base.month - 1) // 3
    end_month = (quarter + 1) * 3
    last_day = calendar.monthrange(base.year, end_month)[1]
    return base.replace(month=end_month, day=last_day, hour=23, minute=59, second=59, microsecond=999999)


def is_leap_year(year: int) -> bool:
    """判断是否为闰年"""
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)


def days_in_month(year: int, month: int) -> int:
    """获取某月的天数"""
    return calendar.monthrange(year, month)[1]


def week_of_year(dt: datetime = None) -> int:
    """获取是当年的第几周"""
    base = dt or datetime.now()
    return base.isocalendar()[1]


def day_of_year(dt: datetime = None) -> int:
    """获取是当年的第几天"""
    base = dt or datetime.now()
    return base.timetuple().tm_yday


def is_today(dt: Union[str, datetime]) -> bool:
    """判断是否为今天"""
    if isinstance(dt, str):
        dt = datetime.strptime(dt, "%Y-%m-%d")
    return dt.date() == datetime.now().date()


def is_weekend(dt: datetime = None) -> bool:
    """判断是否为周末"""
    base = dt or datetime.now()
    return base.weekday() >= 5


def is_workday(dt: datetime = None) -> bool:
    """判断是否为工作日"""
    return not is_weekend(dt)


def age(birth_date: Union[str, datetime]) -> int:
    """计算年龄"""
    if isinstance(birth_date, str):
        birth_date = datetime.strptime(birth_date, "%Y-%m-%d")
    today = datetime.now()
    age = today.year - birth_date.year
    if (today.month, today.day) < (birth_date.month, birth_date.day):
        age -= 1
    return age


def date_range(start: str, end: str, format: str = "%Y-%m-%d") -> List[str]:
    """生成日期范围列表"""
    start_date = datetime.strptime(start, format)
    end_date = datetime.strptime(end, format)
    dates = []
    current = start_date
    while current <= end_date:
        dates.append(current.strftime(format))
        current += timedelta(days=1)
    return dates


def datetime_range(start: datetime, end: datetime, step: timedelta = timedelta(hours=1)) -> List[datetime]:
    """生成日期时间范围列表"""
    dates = []
    current = start
    while current <= end:
        dates.append(current)
        current += step
    return dates


def time_ago(date: Union[str, datetime]) -> str:
    """获取相对时间描述"""
    if isinstance(date, str):
        date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")

    now = datetime.now()
    diff = now - date
    seconds = diff.total_seconds()

    if seconds < 60:
        return "刚刚"
    elif seconds < 3600:
        return f"{int(seconds / 60)}分钟前"
    elif seconds < 86400:
        return f"{int(seconds / 3600)}小时前"
    elif seconds < 2592000:
        return f"{int(seconds / 86400)}天前"
    elif seconds < 31536000:
        return f"{int(seconds / 2592000)}个月前"
    else:
        return f"{int(seconds / 31536000)}年前"


def time_until(date: Union[str, datetime]) -> str:
    """获取距离某时间还有多久"""
    if isinstance(date, str):
        date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")

    now = datetime.now()
    if date <= now:
        return "已过期"

    diff = date - now
    seconds = diff.total_seconds()

    if seconds < 60:
        return "即将开始"
    elif seconds < 3600:
        return f"{int(seconds / 60)}分钟后"
    elif seconds < 86400:
        return f"{int(seconds / 3600)}小时后"
    elif seconds < 2592000:
        return f"{int(seconds / 86400)}天后"
    elif seconds < 31536000:
        return f"{int(seconds / 2592000)}个月后"
    else:
        return f"{int(seconds / 31536000)}年后"


def countdown(target: Union[str, datetime]) -> dict:
    """获取倒计时"""
    if isinstance(target, str):
        target = datetime.strptime(target, "%Y-%m-%d %H:%M:%S")

    now = datetime.now()
    diff = target - now

    if diff.total_seconds() <= 0:
        return {"days": 0, "hours": 0, "minutes": 0, "seconds": 0, "total_seconds": 0}

    total_seconds = int(diff.total_seconds())
    days = total_seconds // 86400
    hours = (total_seconds % 86400) // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60

    return {
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
        "total_seconds": total_seconds
    }


def get_zodiac(month: int, day: int) -> str:
    """根据月日获取星座"""
    zodiac_dates = [
        (1, 20, "水瓶座"), (2, 19, "双鱼座"), (3, 21, "白羊座"),
        (4, 20, "金牛座"), (5, 21, "双子座"), (6, 21, "巨蟹座"),
        (7, 23, "狮子座"), (8, 23, "处女座"), (9, 23, "天秤座"),
        (10, 23, "天蝎座"), (11, 22, "射手座"), (12, 22, "摩羯座")
    ]

    for m, d, sign in zodiac_dates:
        if (month, day) < (m, d):
            return sign
    return "摩羯座"


def get_chinese_zodiac(year: int) -> str:
    """根据年份获取生肖"""
    animals = ["猴", "鸡", "狗", "猪", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊"]
    return animals[year % 12]


def get_weekday_name(dt: datetime = None, lang: str = "zh") -> str:
    """获取星期几的名称"""
    base = dt or datetime.now()
    weekdays = {
        "zh": ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        "en": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "short_zh": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        "short_en": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
    return weekdays.get(lang, weekdays["zh"])[base.weekday()]


def get_month_name(month: int = None, lang: str = "zh") -> str:
    """获取月份名称"""
    if month is None:
        month = datetime.now().month

    months = {
        "zh": ["一月", "二月", "三月", "四月", "五月", "六月",
               "七月", "八月", "九月", "十月", "十一月", "十二月"],
        "en": ["January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December"],
        "short_en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
    return months.get(lang, months["zh"])[month - 1]


def sleep(seconds: float) -> None:
    """睡眠指定秒数"""
    time.sleep(seconds)


def sleep_ms(milliseconds: float) -> None:
    """睡眠指定毫秒数"""
    time.sleep(milliseconds / 1000)


def timer() -> float:
    """获取高精度计时器时间"""
    return time.perf_counter()


def utc_now() -> datetime:
    """获取当前 UTC 时间"""
    return datetime.utcnow()


def utc_timestamp() -> int:
    """获取当前 UTC 时间戳"""
    return int(datetime.utcnow().timestamp())


def to_utc(dt: datetime) -> datetime:
    """转换为 UTC 时间"""
    from datetime import timezone
    return dt.astimezone(timezone.utc).replace(tzinfo=None)


def from_utc(utc_dt: datetime) -> datetime:
    """从 UTC 时间转换为本地时间"""
    import calendar
    timestamp = calendar.timegm(utc_dt.timetuple())
    return datetime.fromtimestamp(timestamp)


def get_timezone_offset() -> int:
    """获取时区偏移（小时）"""
    now = datetime.now()
    utc_now = datetime.utcnow()
    return round((now - utc_now).total_seconds() / 3600)


def format_duration(seconds: int, style: str = "zh") -> str:
    """格式化持续时间"""
    days = seconds // 86400
    hours = (seconds % 86400) // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60

    if style == "zh":
        parts = []
        if days > 0:
            parts.append(f"{days}天")
        if hours > 0:
            parts.append(f"{hours}小时")
        if minutes > 0:
            parts.append(f"{minutes}分")
        if secs > 0 or not parts:
            parts.append(f"{secs}秒")
        return "".join(parts)
    else:
        parts = []
        if days > 0:
            parts.append(f"{days}d")
        if hours > 0:
            parts.append(f"{hours}h")
        if minutes > 0:
            parts.append(f"{minutes}m")
        if secs > 0 or not parts:
            parts.append(f"{secs}s")
        return " ".join(parts)


def parse_duration(duration_str: str) -> int:
    """解析持续时间字符串为秒数"""
    import re
    pattern = r'(\d+)([dhms])'
    matches = re.findall(pattern, duration_str.lower())

    multipliers = {'d': 86400, 'h': 3600, 'm': 60, 's': 1}
    total = 0
    for value, unit in matches:
        total += int(value) * multipliers.get(unit, 0)
    return total


def is_valid_date(year: int, month: int, day: int) -> bool:
    """检查日期是否有效"""
    try:
        datetime(year, month, day)
        return True
    except ValueError:
        return False


def calendar_month(year: int = None, month: int = None) -> List[List[int]]:
    """获取某月的日历矩阵"""
    if year is None:
        year = datetime.now().year
    if month is None:
        month = datetime.now().month

    cal = calendar.Calendar()
    return cal.monthdayscalendar(year, month)


def iso_format(dt: datetime = None) -> str:
    """获取 ISO 格式时间字符串"""
    base = dt or datetime.now()
    return base.isoformat()


def from_iso(iso_str: str) -> datetime:
    """从 ISO 格式解析时间"""
    return datetime.fromisoformat(iso_str.replace('Z', '+00:00'))


class Timer:
    """计时器上下文管理器"""
    def __init__(self, name: str = "Timer"):
        self.name = name
        self.start_time = None
        self.end_time = None

    def __enter__(self):
        self.start_time = time.perf_counter()
        return self

    def __exit__(self, *args):
        self.end_time = time.perf_counter()
        elapsed = self.end_time - self.start_time
        print(f"{self.name}: {elapsed:.4f} seconds")

    @property
    def elapsed(self) -> float:
        if self.end_time:
            return self.end_time - self.start_time
        return time.perf_counter() - self.start_time


class Stopwatch:
    """秒表"""
    def __init__(self):
        self._start_time = None
        self._elapsed = 0
        self._running = False

    def start(self):
        """开始计时"""
        if not self._running:
            self._start_time = time.perf_counter()
            self._running = True

    def stop(self):
        """停止计时"""
        if self._running:
            self._elapsed += time.perf_counter() - self._start_time
            self._running = False

    def reset(self):
        """重置"""
        self._elapsed = 0
        self._start_time = None
        self._running = False

    def restart(self):
        """重新开始"""
        self.reset()
        self.start()

    @property
    def elapsed(self) -> float:
        """获取已用时间"""
        if self._running:
            return self._elapsed + (time.perf_counter() - self._start_time)
        return self._elapsed
from datetime import datetime, timedelta

def now_str():
    """返回当前时间字符串 2025-01-01 10:00:00"""
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def today():
    """返回今天日期 2025-01-01"""
    return datetime.now().strftime("%Y-%m-%d")

def add_days(days):
    """N天后的日期"""
    d = datetime.now() + timedelta(days=days)
    return d.strftime("%Y-%m-%d")

def timestamp():
    """获取时间戳"""
    return int(datetime.now().timestamp())

def diff_days(date_str):
    """计算与今天相差天数"""
    d = datetime.strptime(date_str, "%Y-%m-%d")
    return (datetime.now() - d).days
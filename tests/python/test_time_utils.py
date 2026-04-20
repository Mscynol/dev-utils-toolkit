import unittest
from datetime import datetime, date
from src.python.time_utils import now_str, today, timestamp, add_days, format_datetime


class TestTimeUtils(unittest.TestCase):
    def test_now_str_default(self):
        result = now_str()
        self.assertIsInstance(result, str)
        self.assertEqual(len(result), 19)  # 'YYYY-MM-DD HH:MM:SS'

    def test_now_str_custom_format(self):
        result = now_str('%Y-%m-%d')
        self.assertIsInstance(result, str)
        self.assertEqual(len(result), 10)  # 'YYYY-MM-DD'

    def test_today(self):
        result = today()
        self.assertIsInstance(result, date)
        self.assertEqual(result, date.today())

    def test_timestamp(self):
        result = timestamp()
        self.assertIsInstance(result, int)
        self.assertGreater(result, 0)

    def test_add_days(self):
        result = add_days(7)
        self.assertIsInstance(result, date)
        expected = date.today() + __import__('datetime').timedelta(days=7)
        self.assertEqual(result, expected)

    def test_add_days_negative(self):
        result = add_days(-7)
        expected = date.today() - __import__('datetime').timedelta(days=7)
        self.assertEqual(result, expected)

    def test_format_datetime(self):
        dt = datetime(2025, 1, 1, 10, 30, 0)
        result = format_datetime(dt, '%Y-%m-%d %H:%M')
        self.assertEqual(result, '2025-01-01 10:30')


if __name__ == '__main__':
    unittest.main()

import unittest
import os
import tempfile
from src.python.utils import md5, sha256, random_string, retry


class TestUtils(unittest.TestCase):
    def test_md5(self):
        self.assertEqual(md5(''), 'd41d8cd98f00b204e9800998ecf8427e')
        self.assertEqual(md5('hello'), '5d41402abc4b2a76b9719d911017c592')
        self.assertEqual(md5('你好'), '7eca689f0d3389d9dea66ae112e5cfd7')

    def test_sha256(self):
        self.assertEqual(
            sha256('hello'),
            '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
        )

    def test_random_string_default(self):
        result = random_string(10)
        self.assertEqual(len(result), 10)
        self.assertTrue(result.isalnum())

    def test_random_string_digits_only(self):
        result = random_string(10, digits_only=True)
        self.assertEqual(len(result), 10)
        self.assertTrue(result.isdigit())

    def test_random_string_different(self):
        result1 = random_string(10)
        result2 = random_string(10)
        self.assertNotEqual(result1, result2)

    def test_retry_success(self):
        call_count = 0

        @retry(max_attempts=3, delay=0.1)
        def success_func():
            nonlocal call_count
            call_count += 1
            return 'success'

        result = success_func()
        self.assertEqual(result, 'success')
        self.assertEqual(call_count, 1)

    def test_retry_fail_then_success(self):
        call_count = 0

        @retry(max_attempts=3, delay=0.1)
        def fail_then_success():
            nonlocal call_count
            call_count += 1
            if call_count < 3:
                raise ValueError('Not yet')
            return 'success'

        result = fail_then_success()
        self.assertEqual(result, 'success')
        self.assertEqual(call_count, 3)

    def test_retry_max_attempts(self):
        call_count = 0

        @retry(max_attempts=3, delay=0.1)
        def always_fail():
            nonlocal call_count
            call_count += 1
            raise ValueError('Always fails')

        with self.assertRaises(ValueError):
            always_fail()
        self.assertEqual(call_count, 3)


if __name__ == '__main__':
    unittest.main()

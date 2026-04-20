from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="dev-utils-toolkit",
    version="1.0.0",
    author="Alexis",
    description="实用的开发工具函数库，包含 JavaScript 和 Python 工具集",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/Mscynol/dev-utils-toolkit",
    project_urls={
        "Bug Tracker": "https://github.com/Mscynol/dev-utils-toolkit/issues",
        "Documentation": "https://github.com/Mscynol/dev-utils-toolkit#readme",
        "Source": "https://github.com/Mscynol/dev-utils-toolkit",
    },
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Topic :: Utilities",
    ],
    python_requires=">=3.8",
    keywords="utils toolkit utilities helpers date string array validation",
    extras_require={
        "dev": [
            "pytest>=7.0",
            "pytest-cov>=4.0",
            "black>=23.0",
            "flake8>=6.0",
        ],
    },
)
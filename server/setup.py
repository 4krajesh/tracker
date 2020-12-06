import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="tracker-server", 
    version="1.0",
    author="Rajesh Kudaka",
    author_email="4k.rajesh@gmail.com",
    description="Backend server for expense tracker.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/4krajesh/",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.5',
    install_requires=[ 'configparser',
        'Flask-Cors',
        'Flask',
        'PyMySQL',
        'flask-migrate',
        'flask-sqlalchemy',
        'SQLAlchemy',
        'flake8',
        'simplejson',
        ]
)

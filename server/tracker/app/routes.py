from app import app
from flask import request
import random
import uuid
import datetime
import json
import time

NAMES = ("Coder", "Vegan", "Man", "Hacker", "Horse", "Bear", "Goat", "Goblin", "Learner", "Killer", "Woman", "Spy", "Stalker", "Carrot", "Goat")

@app.route('/')
def first():
    return "Hello World!"


def random_date():
    start_date = datetime.date(2018, 1, 1)
    end_date = datetime.date(2020, 12, 31)

    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    return datetime.datetime.strftime(random_date, '%d %b %Y')

def generate_accounts():
    tot = 0
    banks = ['Citi', 'Kotak', 'SBI', 'Paytm']
    types = ['Credit', 'Savings', 'Current', 'E-Wallet']
    accounts = [{ "name": "All Accounts", "balance": "0", "id": "all", "type": 'All', "default": True },
                { "name": "Wallet", "type": "Cash", "balance": random.randint(100,1000), "id": "wallet", "default": True}]
    for i in range(0,random.randint(5,6)):
        ty = random.choice(types)
        id = random.randint(100000,1000000)
        balance = random.randint(1000,100000)
        acc = {"name": random.choice(NAMES), "balance": balance, "id": id, "default": False, "type": random.choice(types), "bank": random.choice(banks)}
        if ty == 'Credit':
            acc['limit'] = balance + random.randint(10000,100000)
        tot = tot + balance
        accounts.append(acc)
    accounts[0]['balance'] = tot
    print(accounts)
    return accounts

def generate_transactions():
    trans = []
    no_of_trans = random.randint(5,100)
    for i in range(0,no_of_trans):
        trans.append({"id": uuid.uuid1(), "created_at": random_date(), "value": random.randint(100,100000)})
    return trans

@app.route('/accounts')
def accounts():
    return { "accounts": generate_accounts(),
            "transactions": generate_transactions()
    }


@app.route('/account')
def account():
    id = request.args.get('id', type=str)
    return {
            "details":
            {
                "name": "Account1", "type": "Credit", "balance": "10000", "limit": "15000"
                }
            }

@app.route('/createaccount', methods=["POST"])
def create_account():
    post_data = json.loads(request.data.decode('utf-8'))
    print(post_data)
    
    for key in post_data:
        if post_data[key] == '':
            return {"status" : 'error',
                    "msg" : "Null value entry is not permitted."}
    return {"status" : 'success',
            "msg" : "Added successfully."}


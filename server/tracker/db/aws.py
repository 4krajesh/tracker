import boto3

rw_session = boto3.Session(profile_name='dev')
r_session = boto3.Session(profile_name='prod')

dev_client = rw_session.client('dynamodb',)

prod_client = r_session.client('dynamodb')

print(dev_client.list_tables())

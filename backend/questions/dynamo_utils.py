import boto3
from core.aws_config import AWS_CONFIG

class DynamoDBClient:
    def __init__(self):
        self.dynamodb = boto3.resource(
            'dynamodb',
            aws_access_key_id=AWS_CONFIG['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=AWS_CONFIG['AWS_SECRET_ACCESS_KEY'],
            region_name=AWS_CONFIG['REGION_NAME']
        )
        self.table = self.dynamodb.Table(AWS_CONFIG['DYNAMODB_TABLE_NAME'])

    async def get_all_questions(self):
        """
        Future implementation to get questions from DynamoDB
        """
        try:
            response = self.table.scan()
            return response.get('Items', [])
        except Exception as e:
            print(f"Error accessing DynamoDB: {str(e)}")
            return [] 
import os

AWS_CONFIG = {
    'AWS_ACCESS_KEY_ID': os.environ.get('AWS_ACCESS_KEY_ID'),
    'AWS_SECRET_ACCESS_KEY': os.environ.get('AWS_SECRET_ACCESS_KEY'),
    'REGION_NAME': os.environ.get('AWS_REGION', 'us-east-1'),
    'DYNAMODB_TABLE_NAME': os.environ.get('DYNAMODB_TABLE_NAME', 'flashcards')
} 
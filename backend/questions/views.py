from rest_framework.decorators import api_view
from rest_framework.response import Response

# Temporary data - will be replaced with DynamoDB
SAMPLE_DATA = [
    {
        "question": "Question: What is Artificial Intelligence (AI)?",
        "answer": "Answer: AI is the simulation of human intelligence by machines, allowing them to perform tasks such as reasoning, learning, decision-making, and natural language understanding.",
        "num": 1
    },
    {
        "question": "Question: What is Machine Learning (ML)?",
        "answer": "Answer: ML is a subset of AI that enables systems to learn patterns from data and make decisions or predictions without being explicitly programmed.",
        "num": 2
    },
    {
        "question": "Question: What are the three main types of Machine Learning?",
        "answer": "Answer: Supervised Learning, Unsupervised Learning, and Reinforcement Learning.",
        "num": 3
    },
    {
        "question": "Question: What is Supervised Learning?",
        "answer": "Answer: A type of ML where the model is trained on labeled data, learning to map inputs to correct outputs. Example: Predicting house prices.",
        "num": 4
    },
    {
        "question": "Question: What is Unsupervised Learning?",
        "answer": "Answer: A type of ML where the model identifies patterns or groupings in data without labeled outputs. Example: Clustering customers by purchasing behavior.",
        "num": 5
    },
    {
        "question": "Question: What is Reinforcement Learning?",
        "answer": "Answer: A type of ML where an agent learns to make decisions by performing actions and receiving rewards or penalties. Example: Training a robot to walk.",
        "num": 6
    },
    {
        "question": "Question: What are the key steps in a Machine Learning workflow?",
        "answer": "Answer: Data collection, data preprocessing, model selection, model training, evaluation, and deployment.",
        "num": 7
    },
    {
        "question": "Question: What is the difference between overfitting and underfitting?",
        "answer": "Answer: Overfitting occurs when a model learns noise in training data, performing poorly on new data. Underfitting occurs when a model is too simple to capture the underlying patterns.",
        "num": 8
    },
    {
        "question": "Question: Name some common Machine Learning algorithms.",
        "answer": "Answer: Linear Regression, Decision Trees, Random Forest, Support Vector Machines (SVM), and Neural Networks.",
        "num": 9
    },
    {
        "question": "Question: What is a Neural Network?",
        "answer": "Answer: A Neural Network is an ML model inspired by the structure of the human brain, consisting of layers of nodes (neurons) that process information.",
        "num": 10
    },
    {
        "question": "Question: What is the purpose of splitting data into training and testing sets?",
        "answer": "Answer: Training data is used to train the model, while testing data evaluates the model's performance on unseen data to check generalization.",
        "num": 11
    },
    {
        "question": "Question: What are some common applications of AI and ML?",
        "answer": "Answer: Natural language processing (chatbots), computer vision (face recognition), recommendation systems (Netflix), and predictive analytics (finance).",
        "num": 12
    }
]

@api_view(['GET'])
def questions(request):
    try:
        # This will be replaced with DynamoDB query
        return Response(SAMPLE_DATA)
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=500
        )
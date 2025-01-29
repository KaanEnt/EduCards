from django.core.management.base import BaseCommand
from flashcards_api.models import Flashcard

class Command(BaseCommand):
    help = 'Seeds the database with initial data'

    def handle(self, *args, **kwargs):
        # Initial data
        Flashcard.objects.create(
            question="What is React?",
            answer="A JavaScript library for building user interfaces",
            topic="Frontend Development"
        )
        Flashcard.objects.create(
            question="What is Django?",
            answer="A Python web framework",
            topic="Backend Development"
        )

        # AI Questions
        Flashcard.objects.create(
            question="What is the Turing Test?",
            answer="A test of a machine's ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human",
            topic="Artificial Intelligence",
            course="AI Fundamentals"
        )
        Flashcard.objects.create(
            question="What is a neural network?",
            answer="A series of algorithms that attempt to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates",
            topic="Artificial Intelligence",
            course="AI Fundamentals"
        )
        Flashcard.objects.create(
            question="What is reinforcement learning?",
            answer="A type of machine learning where an agent learns to make decisions by performing actions and receiving rewards or penalties",
            topic="Artificial Intelligence",
            course="AI Advanced Concepts"
        )

        # Machine Learning Questions
        Flashcard.objects.create(
            question="What is supervised learning?",
            answer="A type of machine learning where the model is trained on labeled data",
            topic="Machine Learning",
            course="ML Basics"
        )
        Flashcard.objects.create(
            question="What is the difference between classification and regression?",
            answer="Classification predicts discrete labels, while regression predicts continuous values",
            topic="Machine Learning",
            course="ML Basics"
        )
        Flashcard.objects.create(
            question="What is overfitting in machine learning?",
            answer="When a model learns the training data too well, including its noise and outliers, resulting in poor performance on new data",
            topic="Machine Learning",
            course="ML Advanced Concepts"
        )
        Flashcard.objects.create(
            question="What is a decision tree?",
            answer="A tree-like model of decisions and their possible consequences, used for classification and regression",
            topic="Machine Learning",
            course="ML Algorithms"
        )
        Flashcard.objects.create(
            question="What is the purpose of cross-validation?",
            answer="To assess how the results of a statistical analysis will generalize to an independent dataset",
            topic="Machine Learning",
            course="ML Model Evaluation"
        )

        # Software Development Questions
        Flashcard.objects.create(
            question="What is the SOLID principle in object-oriented design?",
            answer="Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles",
            topic="Software Development",
            course="OOP Principles"
        )
        Flashcard.objects.create(
            question="What is the difference between functional and object-oriented programming?",
            answer="Functional programming uses immutable data and pure functions, while OOP uses objects and methods to manipulate state",
            topic="Software Development",
            course="Programming Paradigms"
        )
        Flashcard.objects.create(
            question="What is a REST API?",
            answer="An architectural style for designing networked applications that uses HTTP methods to perform CRUD operations",
            topic="Software Development",
            course="API Design"
        )
        Flashcard.objects.create(
            question="What is the difference between unit testing and integration testing?",
            answer="Unit testing verifies individual components in isolation, while integration testing verifies the interaction between components",
            topic="Software Development",
            course="Software Testing"
        )
        Flashcard.objects.create(
            question="What is continuous integration?",
            answer="A development practice where developers integrate code into a shared repository frequently, with automated builds and tests",
            topic="Software Development",
            course="DevOps"
        )
        Flashcard.objects.create(
            question="What is the difference between SQL and NoSQL databases?",
            answer="SQL databases are relational and use structured query language, while NoSQL databases are non-relational and can store unstructured data",
            topic="Software Development",
            course="Database Systems"
        )
        Flashcard.objects.create(
            question="What is the purpose of version control systems like Git?",
            answer="To track changes in source code, enable collaboration, and maintain different versions of software projects",
            topic="Software Development",
            course="Version Control"
        )

        self.stdout.write(self.style.SUCCESS('Successfully seeded data with 15 additional questions')) 
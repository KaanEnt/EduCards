import os
import time
import google.generativeai as genai
from django.conf import settings
import json

class GeminiService:
    def __init__(self):
        genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
        self.generation_config = {
            "temperature": 0.25,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
            "response_mime_type": "application/json",
        }
        
        self.model = genai.GenerativeModel(
            model_name="gemini-2.0-flash-exp",
            generation_config=self.generation_config,
            system_instruction="""You are an expert on making flashcards when provided with the whole pdf of a course material. 
            The input data is always through a text message and along with this a pdf document of the course, 
            I would need you to construct the flashcards in the structure of 
            {{question: ""},{answer: ""},{course: ""},{topic: ""}}."""
        )

    def upload_file(self, file_path, mime_type="application/pdf"):
        """Uploads the given file to Gemini."""
        file = genai.upload_file(file_path, mime_type=mime_type)
        print(f"Uploaded file '{file.display_name}' as: {file.uri}")
        return file

    def wait_for_file_active(self, file):
        """Waits for the file to be active."""
        print("Waiting for file processing...")
        while file.state.name == "PROCESSING":
            print(".", end="", flush=True)
            time.sleep(10)
            file = genai.get_file(file.name)
        if file.state.name != "ACTIVE":
            raise Exception(f"File {file.name} failed to process")
        print("...file ready")
        print()
        return file

    def process_pdf_to_flashcards(self, file_path):
        """Process PDF and generate flashcards using Gemini."""
        try:
            # Upload file to Gemini
            uploaded_file = self.upload_file(file_path)
            
            # Wait for file to be processed
            self.wait_for_file_active(uploaded_file)
            
            # Start chat session
            chat = self.model.start_chat()
            
            # Send message with file
            response = chat.send_message([
                uploaded_file,
                "Can you help me turning this course into flashcards?"
            ])
            
            # Parse JSON response
            json_str = response.text.strip('```json\n').strip('```')
            flashcards = json.loads(json_str)
            
            return flashcards
            
        except Exception as e:
            print(f"Error in process_pdf_to_flashcards: {str(e)}")
            raise 
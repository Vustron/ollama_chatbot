# get dependencies
from fastapi import FastAPI, HTTPException,Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import logging
from functools import lru_cache

from api.models import ChatRequest, ChatResponse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# init app
app = FastAPI(title="Ollama Chat API", version="1.0.0")

# set allowed origins
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

# set cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# init middlewares
app.add_middleware(GZipMiddleware, minimum_size=1000)

CHAT_TEMPLATE = """
Answer the question below based on the conversation history.

Conversation history:
{context}

Question: {question}

Answer:
"""

@lru_cache()
def get_model():
    return OllamaLLM(model="llama3")

@lru_cache()
def get_chain():
    model = get_model()
    prompt = ChatPromptTemplate.from_template(CHAT_TEMPLATE)
    return prompt | model


@app.get("/api/v2/")
async def hello_world():
    """
    Root endpoint to check if the API is online.
    """
    message = "Ollama API online"
    return JSONResponse(content=message, status_code=200)

@app.post("/api/v2/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, chain=Depends(get_chain)):
    """
    Chat endpoint that processes the conversation and returns a response.
    """
    try:
        context = "\n".join([f"{msg.role}: {msg.content}" for msg in request.messages[:-1]])
        question = request.messages[-1].content
        
        logger.info(f"Processing chat request with context length: {len(context)}")
        
        result = chain.invoke({"context": context, "question": question})
        
        logger.info("Chat response generated successfully")
        
        return ChatResponse(response=result)
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while processing your request")




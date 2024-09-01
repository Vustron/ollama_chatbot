# get dependencies
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse

# init app
app = FastAPI()

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

@app.get("/api/v2/hello-world")
async def predict():
    message = "Hello world"
    return JSONResponse(content = message, status_code = 200,)



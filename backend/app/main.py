from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.citizen import router as citizen_router
from app.api.authority import router as authority_router

app = FastAPI(
    title="Rakshak AI Backend",
    description="National Digital Public Safety Platform API foundation.",
    version="1.0.0"
)

# Configure CORS to allow access from Next.js web portal (localhost:3000, localhost:3001)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(citizen_router, prefix="/api/v1")
app.include_router(authority_router, prefix="/api/v1/authority")

@app.get("/")
def read_root():
    return {
        "status": "ONLINE",
        "service": "Rakshak AI Backend Interface",
        "agents_active": ["Threat Intelligence Agent", "Citizen Risk Agent"]
    }

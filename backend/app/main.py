from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.citizen import router as citizen_router
from app.api.authority import router as authority_router
from app.api.auth import router as auth_router

app = FastAPI(
    title="Rakshak AI Backend",
    description="National Digital Public Safety Platform API foundation.",
    version="1.0.0"
)

# Configure CORS to allow access from any domain (such as Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(citizen_router, prefix="/api/v1")
app.include_router(authority_router, prefix="/api/v1/authority")
app.include_router(auth_router, prefix="/api/v1/auth")

@app.get("/")
def read_root():
    return {
        "status": "ONLINE",
        "service": "Rakshak AI Backend Interface",
        "agents_active": ["Threat Intelligence Agent", "Citizen Risk Agent"]
    }

# Rakshak AI - FastAPI Backend Agent Service

This is the multi-agent backend engine for **Rakshak AI**, built on FastAPI and powered by **Google Gemini 2.5 Flash**.

---

## 🔑 Setup Instructions

### 1. How to Obtain a Gemini API Key
To execute live threat audits, you need a Google Gemini API Key:
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click on **Create API Key** / **Get API Key**.
4. Copy the generated key.

### 2. Where to Place the `.env` File
Create a `.env` file inside the `backend/` directory of your project:

**File Path**: `backend/.env`

**File Content**:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🚀 Running the Backend

### Prerequisites
*   Python 3.10 or higher installed.

### Steps to Run:
1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Start the Uvicorn server**:
    ```bash
    python -m uvicorn app.main:app --port 8000
    ```

4.  **Verify Running**:
    Open [http://localhost:8000/](http://localhost:8000/) in your browser. You should see:
    ```json
    {"status":"ONLINE","service":"Rakshak AI Backend Interface", ...}
    ```

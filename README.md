<div align="center">
  <img src="https://gssoc.girlscript.tech/logo.png" alt="GSSoC Logo" width="150"/>
  <h1>Heart AI System 🫀</h1>
  <h3><i>Advanced Health Analytics & Predictive Intelligence Platform</i></h3>
  <p><b>Proudly participating in GirlScript Summer of Code (GSSoC) 2026!</b></p>
  <p>
    <a href="https://gssoc.girlscript.tech/"><img src="https://img.shields.io/badge/GSSoC-2026-F97316?style=for-the-badge&logo=github&logoColor=white" alt="GSSoC 2026"/></a>
    <a href="https://gssoc.girlscript.tech/"><img src="https://img.shields.io/badge/Project_Admin-GSSoC'26-0284C7?style=for-the-badge" alt="Project Admin"/></a>
    <a href="https://gssoc.girlscript.tech/"><img src="https://img.shields.io/badge/AI_Agents-Track-8B5CF6?style=for-the-badge" alt="AI Agents Track"/></a>
    <a href="https://github.com/Prashant-Singh-Rawat/Tony-AI-Health-Analysis-System/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License"/></a>
  </p>
</div>

---

## 📋 Table of Contents
1. [Overview](#-overview)
2. [Key Features](#-key-features)
3. [System Architecture & Workflow](#-system-architecture--workflow)
4. [Tech Stack](#-tech-stack)
5. [Codebase Structure](#-codebase-structure)
6. [Getting Started & Local Setup](#-getting-started--local-setup)
7. [Environment Configuration](#-environment-configuration)
8. [Machine Learning Model Pipeline](#-machine-learning-model-pipeline)
9. [Contributing](#-contributing)
10. [License](#-license)

---

## 🌟 Overview
The **Heart AI System** (also known as the *Tony Health Analysis System*) is a state-of-the-art health analysis platform that leverages artificial intelligence and machine learning to analyze clinical reports and provide personalized health assessments. 

Designed for both individuals and healthcare providers, the system features:
- **Generative AI Diagnostics**: Text-extraction and deep analysis of unstructured PDF medical reports using Google Gemini.
- **Longitudinal Trend Analysis**: Automatically compares new medical reports with historical data to track patient progress over time.
- **Predictive ML Classification**: Tabular risk assessment based on clinical metrics utilizing a Random Forest classifier.
- **Interactive UI**: A modern React-based portal with a responsive dashboard, auth integration, and medicine price lookups.

---

## ✨ Key Features
- **PDF Report Parser & Analyzer**: Upload clinical PDFs (e.g., blood tests, cardiovascular reports), parse them, and receive structured health profiles.
- **Longitudinal Trend Tracking**: Analyzes the trajectory of health metrics over time (e.g., indicating whether a condition is "Improving" or "Worsening").
- **Personalized Recommendations**: Automatically generates custom diet and exercise plans based on report findings.
- **Google OAuth Integration**: Secure user authentication and report history isolation.
- **Standalone ML Predictor**: A Streamlit interface for instantaneous risk predictions using a trained Random Forest model.

---

## 🔄 System Architecture & Workflow

### Architectural Flowchart
```mermaid
graph TD
    A[React Frontend] -->|1. Google OAuth| B(FastAPI Backend)
    A -->|2. Upload Medical PDF| B
    B -->|3. Extract Text| C[PDF Parser]
    B -->|4. Query History & Current Report| D[Google Gemini 1.5 Flash]
    D -->|5. Structured JSON Analysis| B
    B -->|6. Save Report & Health Trends| E[(SQLite Database)]
    B -->|7. Return Structured Results| A
    
    F[Streamlit Web App] -->|Interactive Form| G[Random Forest Model heart_model.pkl]
    G -->|Predict Risk Score| F
```

### Detailed Workflow Steps

1. **Authentication**: Users sign in securely using Google OAuth, matching their identity in the SQL database.
2. **Report Upload**: The patient uploads a medical report in PDF format.
3. **Data Extraction & AI Processing**:
   - PyPDF2 extracts text from the document.
   - The backend retrieves the user's historical reports from the database.
   - If history exists, a comparative prompt is constructed for **Google Gemini 1.5 Flash** to perform trend analysis.
   - Gemini returns a structured JSON payload containing `disease_type`, `risk_score`, `concerns`, `exercise_plan`, `food_plan`, and `overall_status`.
4. **Data Persistence**: Analysis details are stored in the database for tracking future trends.
5. **Dashboard Rendering**: The user is presented with visual health scores, warnings, and dynamic diet/exercise recommendations.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Component-driven UI.
- **Tailwind CSS / Vanilla CSS**: Aesthetic, responsive layouts.
- **Streamlit**: Web dashboard for the offline machine learning model predictor.

### Backend & API Layer
- **FastAPI**: Fast, asynchronous Web API framework.
- **SQLAlchemy & SQLite**: ORM and relational database storage.
- **PyPDF2**: Local text extraction from PDF files.
- **Google Generative AI SDK**: Integrates `gemini-1.5-flash` for advanced report analysis.

### Machine Learning
- **Scikit-Learn**: Used to train the Random Forest Classifier.
- **Pandas & NumPy**: Data processing and matrix manipulation.
- **Pickle**: Serializes and loads the trained model.

---

## 📂 Codebase Structure
```text
Heart-AI-System/
├── backend/               # FastAPI Backend Service
│   ├── ai_service.py      # PDF parsing and Gemini API orchestration
│   ├── database.py        # SQLite Database connection and session management
│   ├── main.py            # API routes and Google Auth verification
│   ├── models.py          # SQLAlchemy Models (User, Report)
│   ├── schemas.py         # Pydantic Schemas for validation
│   ├── requirements.txt   # Backend dependency list
│   └── tests/             # API Unit Tests
│
├── frontend/              # React (Vite) Frontend
│   ├── src/
│   │   ├── components/    # Reusable components (e.g., AuthModal)
│   │   ├── pages/         # Dashboard, LandingPage, MedicinePrices
│   │   ├── main.jsx       # App entry point
│   │   └── App.jsx        # Routing and global layout
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite builder config
│
├── app.py                 # Streamlit ML predictor interface
├── train_model.py         # Script to train & serialize the Random Forest model
├── heart_model.pkl        # Serialized Machine Learning model (generated)
├── requirements.txt       # Global/Streamlit Python requirements
└── LICENSE                # Open-source license
```

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- Python 3.10+
- Node.js (v18+)
- npm or yarn

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Prashant-Singh-Rawat/Tony-AI-Health-Analysis-System.git
cd Heart-AI-System
```

---

### Step 2: Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will run on `http://127.0.0.1:8000`.

---

### Step 3: Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Launch the Vite dev server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

---

### Step 4: Standalone Machine Learning App (Streamlit)
To interact directly with the tabular Random Forest model:
1. Ensure you are in the root directory:
   ```bash
   cd Heart-AI-System
   ```
2. Install global dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the model training script (if `heart_model.pkl` is missing):
   ```bash
   python train_model.py
   ```
4. Start the Streamlit application:
   ```bash
   streamlit run app.py
   ```
   The application will open in your default browser at `http://localhost:8501`.

---

## 🔑 Environment Configuration

Create a `.env` file in the `backend/` directory to store your API keys and secrets securely:

```env
GEMINI_API_KEY=your_google_gemini_api_key
# Optional Client ID configuration for Google Auth verification
GOOGLE_CLIENT_ID=your_google_client_id
```

> [!IMPORTANT]
> Never commit your `.env` file containing sensitive keys to GitHub. It is ignored by default in the `.gitignore` settings.

---

## 🧠 Machine Learning Model Pipeline
The system utilizes a Random Forest classifier trained on diagnostic features:
- **Features (13)**: Age, Sex, Chest Pain type (cp), Resting Blood Pressure (trestbps), Cholesterol (chol), Fasting Blood Sugar (fbs), Resting Electrocardiographic results (restecg), Max Heart Rate achieved (thalach), Exercise Induced Angina (exang), ST depression (oldpeak), Slope of peak exercise ST segment (slope), Number of major vessels (ca), and Thalassemia (thal).
- **Output**: Binary classification (`1` for High Risk, `0` for Low Risk).

To retrain the model, modify `train_model.py` to use a real clinical dataset (e.g., the UCI Heart Disease Dataset) and run `python train_model.py`.

---

## 🤖 Automated Testing & CI/CD Pipeline

The project implements a comprehensive automation suite configured via GitHub Actions in [.github/workflows/ci.yml](file:///.github/workflows/ci.yml) to ensure code reliability and validate ML model integrity.

### 🧪 ML Model Sanity & Regression Tests
We have built a dedicated validation script, [test_model.py](file:///test_model.py), which runs:
- **Model Load Checks**: Ensures `heart_model.pkl` is not corrupt and can be loaded.
- **Dimension Matching**: Validates the model accepts exactly 13 medical input features.
- **Prediction Verification**: Tests synthetic low-risk and high-risk patients to ensure predictions behave logically.
- **Regression Evaluation**: Assesses classification accuracy against a validation matrix to prevent performance degradation below 80%.

To run model tests locally:
```bash
python test_model.py
```

### ⚙️ CI/CD Workflow Triggers
- **Pushes & PRs**: Runs automatically on every push or pull request to the `main` branch to prevent regression.
- **Scheduled Weekly Check**: Triggers a cron job every Sunday at 00:00 UTC to verify model integrity against code changes.
- **Manual Dispatch**: Can be run on-demand via the GitHub Actions dashboard (`workflow_dispatch`).

### 📦 Pipeline Stages
1. **Validate ML Model**: Loads, tests dimensions, predictions, and checks regression thresholds on `heart_model.pkl`.
2. **Backend Lint & Unit Tests**: Runs python linting (`flake8`) and tests (`pytest`) once model validation passes.
3. **Frontend Lint & Unit Tests**: Installs, lints (`eslint`), and runs frontend component test suites in parallel.

---


## 🤝 Contributing
This project is open-source and proudly participates in **GirlScript Summer of Code (GSSoC) 2026**!

We highly encourage:
- Bug fixes and features.
- Additional medical PDF parser support.
- Enhancements to the ML model and dashboard UX.

Please check our [CONTRIBUTING.md](CONTRIBUTING.md) for structural guidelines on branches, code format, and how to create a Pull Request.

---

## 📜 License
This project is licensed under the MIT License. Feel free to copy, modify, and distribute code as allowed.

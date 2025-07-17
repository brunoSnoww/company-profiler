# 🏢 AI Company Profiler

An application that automatically generates a detailed company profile by analyzing its website. This project uses a two-step AI prompting strategy to extract and enrich data, providing a comprehensive overview that includes service lines and targeted keywords.

---

## 🚀 Live Demo

You can interact with the live, deployed application here:

* **Frontend Application**: [https://company-profiler-fe-production.up.railway.app/](https://company-profiler-fe-production.up.railway.app/)

* **Backend API**: You can also query the backend directly. For example, to profile Comarch, you can visit: [https://company-profiler-be-production.up.railway.app/profiler?url=https://www.comarch.com/telecommunications/](https://company-profiler-be-production.up.railway.app/profiler?url=https://www.comarch.com/telecommunications/)

---

## ✨ Key Features

* **Automated Profile Generation**: Input a company URL and instantly get a structured JSON profile.
* **Two-Step AI Analysis**: Utilizes a sophisticated "chain-of-thought" process to first extract core information and then generate strategic keywords.
* **Decoupled Architecture**: A robust client-server model allows the backend to be used by any client, whether it's the provided React app, a CLI, or another service.
* **Modern Frontend**: A responsive and intuitive user interface built with React, Google Material UI, and React Query for efficient data fetching.

---

## 🏗️ Architecture

This repository follows a simple and effective client-server model, ensuring a clean separation of concerns.

### Node.js Backend

The backend is a Node.js service built with a modular and scalable architecture. The design is inspired by the principles in the book [Accelerating Server-Side Development with Fastify](https://www.amazon.com/Accelerating-Server-Side-Development-Fastify-comprehensive-ebook/dp/B0B2PR8RQY), emphasizing a plugin-based structure.

This makes the system highly maintainable. For example, swapping the AI model provider (e.g., from OpenAI to Google Gemini) is a matter of changing configuration, not rewriting application code.

### React Frontend

The frontend is a lightweight React application bootstrapped from scratch. It leverages:

* **Google Material UI**: For a clean, modern, and responsive component library.
* **React Query (TanStack Query)**: For efficient server-state management, including data fetching, caching, and synchronization.

---

## 🧠 Prompt Design Philosophy

The design of the prompts is heavily inspired by the structured techniques outlined in the book [Prompt Engineering for Generative AI](https://www.amazon.com.br/Prompt-Engineering-Generative-AI-Future-Proof/dp/109815343X/). The effectiveness of this application hinges on a **two-step prompting strategy** rather than a single, monolithic prompt. This "Divide and Conquer" approach ensures higher accuracy and is guided by key engineering principles:

* **1. Divide Labor (The Two-Step Chain)**: The task is broken down into two distinct steps.
    * **Prompt 1 (Extraction)**: Focuses solely on extracting factual information: the company's name, description, and services.
    * **Prompt 2 (Enrichment)**: Takes the clean output from the first step and uses it to perform a more interpretive task: generating strategic Tier 1 and Tier 2 keywords.

* **2. Give Direction (Persona-Based Prompting)**: Each prompt assigns a specific role to the AI. The extraction prompt uses a "Data Extraction Assistant" persona, while the keyword prompt uses a more specialized "Government Procurement Expert" persona. This focuses the model on the specific context of each sub-task.

* **3. Specify Format (Strict Schema Enforcement)**: Both prompts contain explicit instructions for the output to be a valid JSON object conforming to a precise schema. This is crucial for ensuring reliable communication between the AI and the backend service.

* **4. Provide Examples (Few-Shot Learning)**: To improve accuracy and guide the model's reasoning, the prompts include high-quality examples of the desired input-to-output transformation. This helps the model understand nuances, like the difference between a service and a feature.

---

## 🛠️ Getting Started (Local Development)

Follow these instructions to get the project running on your local machine.

### Prerequisites

* Node.js (v18 or later) & npm
* Docker & Docker Compose

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Add your OpenAI API key to the new `docker-compose.yaml` file:
    ```
    OPENAI_API_KEY=sk-YourSecretApiKeyGoesHere
    ```
3.  Build and run the service using Docker Compose:
    ```bash
    docker-compose build fastify
    docker-compose up
    ```
    The backend will be running on `http://localhost:3000`.

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## 🔌 API Usage

You can interact with the backend API directly via a GET request.

**Endpoint**: `GET /profiler`

Provide the target website as a URL query parameter named `url`.

**Example using `curl`**:

```bash
curl "https://company-profiler-be-production.up.railway.app/profiler?url=https://www.ibm.com"

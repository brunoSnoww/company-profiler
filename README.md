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
* **Two-Step AI Analysis**: Utilizes a two step approach to extract core information and then generate strategic keywords.
* **Decoupled Architecture**: A robust client-server model allows the backend to be used by any client, whether it's the provided React app, a CLI, or another service.
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

## Prompts
In our application, we moved beyond a single, generic instruction and engineered two distinct prompts, each designed for a specific sub-task. This structured approach, inspired by the techniques in the book [Prompt Engineering for Generative AI](https://www.amazon.com.br/Prompt-Engineering-Generative-AI-Future-Proof/dp/109815343X/), was crucial for building a reliable system.

The core of our design is a **two-step prompting strategy**, a practical application of the **Divide Labor** principle. Instead of asking one prompt to do everything, we broke the problem down.

---

### Prompt 1: Core Profile Extraction

The first prompt we developed is a specialist in data extraction. Its only job is to read the raw text from a company's website and pull out the fundamental, factual information.

To build it, we applied several principles:

* **Give Direction**: We assigned the AI the specific persona of a "Data Extraction Assistant." This focuses its attention on objective analysis rather than creative interpretation.
* **Specify Format**: The prompt strictly instructs the model to return a JSON object with a predefined schema: `company_name`, `company_description`, and `service_line`. This guarantees a predictable output that our backend service can reliably process.
* **Provide Examples**: We included a "few-shot" example directly in the prompt. This was key to teaching the model the nuance of our request, such as how to correctly identify a distinct service line versus a minor product feature.

---

### Prompt 2: Specialized Keyword Generation

The second prompt is an enrichment specialist. It takes the clean, structured JSON from the first prompt as its input and performs a more interpretive task: creating strategic keywords.

Its development followed the same structured approach:

* **Give Direction**: This prompt adopts the more specialized persona of a "Government Procurement Expert." This guides the AI to think specifically in terms of search queries that would be used to find public contracts and opportunities.
* **Specify Format**: The required output is, again, a strictly enforced JSON schema, but this time containing only `tier1_keywords` and `tier2_keywords`.
* **Provide Examples**: The example in this prompt is critical for demonstrating the subtle difference between high-intent, specific Tier 1 keywords and the broader, related terms required for Tier 2.

By developing each prompt with this deliberate, principle-driven method, we created a more robust, predictable, and accurate AI-powered system.
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

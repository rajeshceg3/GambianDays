# Deployment Guide

## Analysis Summary
This project is a Next.js application (Full Stack) configured with a robust multi-stage `Dockerfile` producing a standalone output. The presence of `next.config.mjs` with `output: "standalone"` confirms it is optimized for containerized environments. Given the existing Docker infrastructure, the most suitable deployment strategy is using a Docker-based Platform as a Service (PaaS).

## Recommended Platform: Render
**Render** is recommended for this project because:
- **Native Docker Support:** It can deploy the container image directly from the GitHub Container Registry (GHCR) or build from source.
- **Simple CI/CD Integration:** Supports "Deploy Hooks" for zero-downtime updates triggered by GitHub Actions.
- **Cost-Effective:** Offers a free tier and simple pricing for containers.

## Deployment Instructions

### 1. Prerequisites
- A [Render](https://render.com) account.
- This GitHub repository.

### 2. Configure Render
1.  **Create a New Web Service** in Render.
2.  **Source:** Select "Existing Image" (if pushing to GHCR first) or "Git Provider" (to let Render build it).
    *   *Recommended for this workflow:* Connect your GitHub account and select this repository. Choose **Docker** as the Runtime.
3.  **Environment Variables:** Add any necessary env vars (e.g., `NEXT_PUBLIC_...`).
4.  **Region:** Select a region close to your users.
5.  **Create Web Service.**

### 3. Setup CI/CD with GitHub Actions
This repository includes a `.github/workflows/deploy.yml` that:
1.  Validates the code (Lint, Test, Audit).
2.  Builds the Docker image and pushes it to GitHub Container Registry (GHCR).
3.  Triggers a deployment on Render.

**To enable the automatic deployment trigger:**
1.  Go to your Render Dashboard -> Select your Service -> **Settings**.
2.  Scroll to **Deploy Hook** and copy the URL.
3.  Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
4.  Create a **New repository secret**:
    -   **Name:** `RENDER_DEPLOY_HOOK`
    -   **Value:** (Paste the URL from Render)
5.  *Optional:* If your repository is Private, you may need to configure Render to access GHCR or simply let Render build from Git (in which case the "Build Container Image" step in GitHub Actions is for verification only).

### 4. Verification
- Push a change to the `main` branch.
- Go to the **Actions** tab in GitHub to watch the workflow.
- Once the `deploy` job completes, check your Render dashboard to see the new deployment starting.

## Additional Notes
- **Testing:** A placeholder `test` script has been added to `package.json`. You should replace `echo "No tests specified"` with your actual test runner (e.g., `jest` or `vitest`) when ready.
- **Caching:** The workflow uses GitHub Actions caching to speed up Docker builds.

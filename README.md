# 📸 Image Uploader – Serverless Project (Node.js + AWS)

Acest proiect demonstrativ este o aplicație web serverless care permite încărcarea și gestionarea imaginilor direct în Amazon S3 folosind presigned URLs generate de o funcție AWS Lambda expusă prin API Gateway; frontend-ul este găzduit ca static website în S3, backend-ul este implementat cu AWS SAM, iar întregul flux ilustrează integrarea principalelor servicii AWS (S3, Lambda, API Gateway, IAM) într-o soluție modernă și scalabilă

---

## 🚀 Funcționalități

- 📤 Upload imagini din browser direct în S3
- 🔑 Generare **presigned URL** prin Lambda
- 🌐 API Gateway cu **CORS activat**
- 🗄️ Hosting static pentru frontend (HTML + JS) pe S3
- ⚙️ Automatizare **CI/CD** cu GitHub Actions (deploy la push pe `main`)

---

## 🛠️ Tehnologii folosite

- **Node.js** (Lambda backend)
- **HTML / JavaScript** (frontend)
- **AWS SAM** (infrastructură ca cod)
- **Amazon S3** (stocare + hosting static)
- **Amazon API Gateway** (endpoint public)
- **GitHub Actions** (CI/CD pipeline)

---

## ⚡ Flux de lucru

1. **Dezvoltare**  
   - Codul backend (`app.js`) generează presigned URL.  
   - Frontend-ul (`index.html`) folosește acest URL pentru upload direct în S3.  

2. **Versionare**  
   - Codul este împins pe GitHub.  

3. **CI/CD**  
   - GitHub Actions rulează automat:
     - `sam build`
     - `sam deploy` (creează/update Lambda + API Gateway + S3)
     - Scrie URL-ul real al API Gateway în `config.json`
     - Publică frontend-ul în bucket-ul S3  

4. **Testare**  
   - Utilizatorii accesează frontend-ul la URL-ul static S3:
     ```
     http://<bucket-name>.s3-website.<region>.amazonaws.com/index.html
     ```

---

**Cum testezi online:**

Accesează link-ul public al S3 static website hosting:

http://img-upload-v1-adi-2025-12345.s3-website.eu-central-1.amazonaws.com/index.html

Selectezi o imagine și apesi Upload.

Fișierul va fi salvat în bucket-ul S3.

   [Browser / Frontend] 
            |
            v
 ┌────────────────────────────┐
 │  Amazon S3 (Static Website)│  ← găzduiește index.html + JS
 └────────────────────────────┘
            |
            v
 ┌────────────────────────────┐
 │   API Gateway (REST API)   │  ← expune endpoint-ul HTTP
 └────────────────────────────┘
            |
            v
 ┌────────────────────────────┐
 │ AWS Lambda (Backend Logic) │  ← generează presigned URLs
 └────────────────────────────┘
            |
            v
 ┌────────────────────────────┐
 │     Amazon S3 (Storage)    │  ← stochează imaginile
 └────────────────────────────┘

  🔹 Fluxul datelor:

Browserul încarcă frontend-ul din S3 (static hosting).

Când selectezi o imagine → request către API Gateway.

API Gateway trimite request-ul la Lambda.

Lambda generează un presigned URL pentru upload.

Browserul folosește acel link și urcă imaginea direct în S3 (bucket de storage).

Imaginile pot fi listate public și afișate în galerie.


   


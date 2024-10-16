PoC: Dynamic Static Hosting Service

📄 Project Description

This Proof of Concept (PoC) demonstrates a dynamic static hosting service where users can upload zipped files for static websites. The system extracts the files, configures subdomains dynamically, and uses Nginx to serve the content based on user and project names.
🛠 Features

    User-Specific Subdomains: Serve user projects via URLs like project.username.cloudastro.com.
    Automated Deployment: Extracts uploaded files and sets them up in specific directories.
    Dynamic Nginx Configuration: Automatically handles subdomains and serves static files efficiently.

🚀 Technologies Used

    Node.js (Backend logic and API)
    Express (Routing and handling file uploads)
    Multer (File upload management)
    Vite+React (Frontend framework)
    Nginx (Serving static files via subdomains)
    Docker (Containerized Nginx service)

📂 Folder Structure

/home/fady/projects/{username}/{projectname}


All user projects are organized in this directory structure, ensuring isolation and clarity.
📝 Usage

    Upload your zipped project using the frontend.
    Backend will unzip and deploy the project in /home/fady/projects/${username}/${projectname}.
    Your project is served via a custom subdomain: project.username.cloudastro.com.

PoC: Dynamic Static Hosting Service
Overview

This Proof of Concept (PoC) demonstrates a dynamic static hosting service where users can upload zipped projects that are automatically extracted and deployed to user-specific directories. The service leverages Nginx, which is configured to handle subdomains dynamically and serve the projects based on custom subdomain names.
Features

    User-specific Subdomains: Users can access their projects via custom URLs using the format project.username.cloudastro.com.
    Automated Deployment: The backend automates file extraction, directory creation, and updates to the system's DNS configuration for local development.
    Dynamic Nginx Configuration: Nginx is set up to dynamically serve static content based on user and project subdomains, enabling scalable project hosting.

Usage

    Upload your zipped project through the provided frontend.
    The system extracts the files and deploys them to /home/fady/projects/${username}/${project}.
    Access your project via the URL project.username.cloudastro.com.

# 🚀 Angular Schematics - Project Setup Toolkit

## Overview

This Angular Schematics package provides a streamlined way to set up new Angular projects with best practices. It automates essential configurations, ensuring consistency and productivity across projects.

## 🌟 Features:

### 📂 Generate a Base Folder Structure

- Creates a well-organized structure with `core/`, `shared/`, and `features/` directories.
- Encourages scalable and maintainable architecture.

### 🔐 Add Firebase Authentication

- Sets up a basic authentication layer using Firebase.
- Generates authentication services and guards for secure routing.

### 🎨 Configure ESLint and Prettier

- Automatically installs and configures ESLint and Prettier for code quality.
- Includes best-practice rules and optional Husky pre-commit hooks.

#### Execution
npm run build
schematics .:generate-folder-structure --dry-run=false

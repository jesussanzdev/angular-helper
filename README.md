# 🚀 Angular Schematics - Project Setup Toolkit

## Overview

This Angular Schematics package provides a streamlined way to set up new Angular projects with best practices. It automates essential configurations, ensuring consistency and productivity across projects.

## 🌟 Features:

### 📂 Generate a Base Folder Structure

- Creates a well-organized structure with `core/`, `shared/`, and `features/` directories.
- Encourages scalable and maintainable architecture.

### 🎨 Configure ESLint and Prettier

- Automatically installs and configures ESLint and Prettier for code quality.
- Includes best-practice rules and optional Husky pre-commit hooks.

### 📝 Generate Editor Config File

- Produces an EditorConfig file with comprehensive configurations to maintain consistent coding styles across different editors and IDEs.

#### ⚙️ Execution Steps
npm install
npm run build
schematics .:generate-folder-structure --dry-run=false
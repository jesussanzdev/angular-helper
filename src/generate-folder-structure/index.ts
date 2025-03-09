import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

function setupEslintPrettier(tree: Tree, context: SchematicContext): void {
  context.addTask(new NodePackageInstallTask({
    packageName: 'eslint prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged'
  }));

  const eslintConfig = {
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    "plugins": ["@typescript-eslint", "prettier"],
    "rules": {
      "prettier/prettier": "error"
    }
  };

  const prettierConfig = {
    "singleQuote": true,
    "trailingComma": "all"
  };

  const huskyConfig = {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  };

  const lintStagedConfig = {
    "*.{js,ts,tsx,css,md}": ["prettier --write", "git add"]
  };

  tree.create('.eslintrc.json', JSON.stringify(eslintConfig, null, 2));
  tree.create('.prettierrc', JSON.stringify(prettierConfig, null, 2));
  tree.create('.huskyrc', JSON.stringify(huskyConfig, null, 2));
  tree.create('.lintstagedrc', JSON.stringify(lintStagedConfig, null, 2));
}


export function generateFolderStructure(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const folders = ['src/app/core', 'src/app/shared', 'src/app/features'];

    folders.forEach((folder) => {
      if (!tree.exists(folder)) {
        tree.create(`${folder}/.gitkeep`, '');
      }
    });

    if (options.eslint) {
      setupEslintPrettier(tree, context);
    }


    return tree;
  };
}

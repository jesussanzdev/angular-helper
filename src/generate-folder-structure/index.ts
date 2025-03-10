import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export interface Schema{
  editor: boolean;
  eslint: boolean;
}

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

export function angularHelperSchematic(options: Schema): Rule {
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

    if(options.editor){
      const editorConfig = `
      # EditorConfig is awesome: https://EditorConfig.org
      
      # top-most EditorConfig file
      root = true
      
      [*]
      charset = utf-8
      end_of_line = lf
      indent_style = space
      indent_size = 2
      trim_trailing_whitespace = true
      insert_final_newline = true
      
      [*.{js,ts,json,css,html}]
      indent_size = 2
      `;
      
      if (!tree.exists('.editorconfig')) {
        tree.create('.editorconfig', editorConfig);
        context.logger.info('.editorconfig generated!');
      } else {
        context.logger.info('.editorconfig already exists.');
      }
    }

    return tree;
  };
}

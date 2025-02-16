import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function generateFolderStructure(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const folders = ['src/app/core', 'src/app/shared', 'src/app/features'];

    folders.forEach((folder) => {
      if (!tree.exists(folder)) {
        tree.create(`${folder}/.gitkeep`, '');
      }
    });

    return tree;
  };
}

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const addToAppStrings = vscode.commands.registerCommand('cwaTools.addToAppStrings', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        if (!selectedText || selectedText.trim() === '') {
            vscode.window.showErrorMessage('No text selected.');
            return;
        }

        const variableName = await vscode.window.showInputBox({
            prompt: 'Enter a variable name for the selected string',
            validateInput: (input) => input && input.trim() !== '' ? null : 'Variable name cannot be empty.'
        });

        if (!variableName) {
            vscode.window.showErrorMessage('Variable name input was cancelled.');
            return;
        }

        const config = vscode.workspace.getConfiguration('cwaTools');
        const defaultAppStringsPath = 'lib/core/l10n/app_strings.dart';
        const appStringsPath = config.get<string>('appStringsPath', defaultAppStringsPath);
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }

        const appStringsFullPath = path.join(workspaceFolders[0].uri.fsPath, appStringsPath);

        try {
            if (!fs.existsSync(appStringsFullPath)) {
                vscode.window.showErrorMessage(`AppStrings file not found at ${appStringsFullPath}`);
                return;
            }

            const appStringsContent = fs.readFileSync(appStringsFullPath, 'utf-8');
            const classEndIndex = appStringsContent.lastIndexOf('}');
            if (classEndIndex === -1) {
                vscode.window.showErrorMessage('Could not find the end of the AppStrings class.');
                return;
            }

            const sanitizedText = selectedText.trim().replace(/^['"]|['"]$/g, '');
            const getterContent = `  String get ${variableName} => '${sanitizedText}';\n`;
            const updatedContent = appStringsContent.slice(0, classEndIndex) + getterContent + appStringsContent.slice(classEndIndex);
            fs.writeFileSync(appStringsFullPath, updatedContent, 'utf-8');

            editor.edit(editBuilder => {
                editBuilder.replace(selection, `AppStrings.ofUntranslated(context).${variableName}`);
            });

            vscode.window.showInformationMessage(`Added '${selectedText}' to AppStrings as '${variableName}'.`);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`Error updating AppStrings: ${errorMessage}`);
        }
    });

    context.subscriptions.push(addToAppStrings);

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "cwa-tools" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('cwa-tools.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from CWA Tools!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

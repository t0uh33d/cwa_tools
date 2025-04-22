![CWA Tools Logo](https://github.com/t0uh33d/cwa_tools/blob/main/images/logo.png?raw=true)

# CWA Tools

CWA Tools is a Visual Studio Code extension designed to enhance productivity when working with Flutter projects. It provides a convenient way to manage app strings by adding them to a centralized `AppStrings` class.

## Features

- **Add to App Strings**: Highlight a string in your Dart code, right-click, and select "Add to App Strings". The extension will:
  - Prompt you for a variable name.
  - Add the string to the `AppStrings` class.
  - Replace the selected string in your code with `AppStrings.ofUntranslated(context).{variable_name}`.

## Configuration

You can configure the path to the `AppStrings` class file in your project settings:

```json
"cwaTools.appStringsPath": "lib/core/l10n/app_strings.dart"
```

The default path is `lib/core/l10n/app_strings.dart`.

## Usage

1. Highlight a string in a Dart file.
2. Right-click and select **Add to App Strings**.
3. Enter a variable name when prompted.
4. The string will be added to the `AppStrings` class, and the code will be updated.

## Requirements

- A Flutter project with an `AppStrings` class defined.

## Installation

To install the extension locally:

1. Package the extension using `vsce package`.
2. Install the `.vsix` file in VS Code via the Command Palette (`Cmd+Shift+P`) > **Extensions: Install from VSIX...**.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

[MIT](LICENSE)

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

### 0.0.1

- Initial release of CWA Tools.
- Added the "Add to App Strings" feature for Flutter projects.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**

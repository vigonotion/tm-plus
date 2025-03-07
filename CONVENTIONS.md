## Code Style

When writing code, you MUST follow these principles:
- Code should be easy to read and understand.
- Keep the code as simple as possible. Avoid unnecessary complexity.
- Use meaningful names for variables, functions, etc. Names should reveal
  intent.
- Functions should be small and do one thing well. They should not exceed a few
  lines.
- Function names should describe the action being performed.
- Prefer fewer arguments in functions. Ideally, aim for no more than two or
  three.
- Only use comments when necessary, as they can become outdated. Instead, strive
  to make the code self-explanatory.
- When comments are used, they should add useful information that is not readily
  apparent from the code itself.
- Properly handle errors and exceptions to ensure the software's robustness.
- Use exceptions rather than error codes for handling errors.
- Consider security implications of the code. Implement security best practices
  to protect against vulnerabilities and attacks.
- Adhere to these 4 principles of Functional Programming:
  1. Pure Functions
  2. Immutability
  3. Function Composition
  4. Declarative Code
- Do not use object oriented programming.

## Design and Components

When writing views, you SHOULD use components from the radix themes catalog. If there is no applicable
component, you MAY write one yourself. In this case, you MUST use colors based on the Radix Colors system.

## Typescript

- Always use nullish coalescing operator (`??`) instead of a logical or (`||`), as it is a safer operator
- Don't use numbers in template literal expressions, convert them to string instead

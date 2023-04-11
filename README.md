# Open AI Summaries

Utilized the OpenAI API, React, NestJS, and TypeScript to help users find key info from articles or webpages. allowing users to highlight text and receive AI-generated summaries with a Chrome extension.

# Run in dev env

1. `pnpm i --frozen-lockfile`
2. `pnpm build:chrome`
3. `pnpm start:backend`
4. Open chrome and load the `apps/chrome/dist` as an unpacked extension

# Run tests

```cmd
pnpm i --frozen-lockfile
pnpm test
```

## Acceptance criteria:

1. Chrome extension: Create a Chrome extension with a popup that includes a button to enable/disable the feature and a list of summaries generated so far.
2. React components: Create reusable React components for the popup, highlights list, and the summary tooltip.
3. State management: Use React hooks and context API to manage the application state.
4. TypeScript: Strictly use TypeScript throughout the project and ensure proper typing for all components and functions.
5. Highlight functionality: When the feature is enabled, allow users to highlight text on a webpage by selecting it with their mouse.
6. API integration: Integrate the OpenAI API to process the highlighted text and generate a brief summary.
7. Display the summary: Show the summary in a tooltip when the user hovers over the highlighted text, using a custom React component.
8. Backend: Implement a NestJS backend that will handle the API calls to OpenAI and any necessary processing.
9. Data persistence: Store the user's highlights and summaries using MongoDB.
10. Testing: Write unit tests for your code to ensure the proper functionality of the Chrome extension, with a focus on testing React components and TypeScript typings.
11. Code quality, readability, and organization, with a focus on React and TypeScript
12. Proper use of React, NestJS, and TypeScript, including typing, hooks, and context API
13. Effective integration with OpenAI API and MongoDB
14. Responsive and user-friendly design of the Chrome extension
15. Completeness of the solution and extra features implemented

Future goals (Optional):

- User authentication: Implement a user authentication system using React components and context API, allowing users to access their saved highlights and summaries across devices.
- Tagging system: Allow users to categorize their highlights with tags for easier organization and retrieval. Use React components to display and manage tags.
- Export functionality: Enable users to export their highlights and summaries as a PDF, CSV, or other formats using a dedicated React component.

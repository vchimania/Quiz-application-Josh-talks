Application Includes:
1. User need to verify his email to attempt quiz
2. Once user verify email user will be eligilble to attend quiz
3. While attemping quiz user can see timer on top ,when the timer reaches 0, it triggers the auto-submission of the quiz and disables the timer.
4. Aspects of the quiz, including the current question, selected answers, quiz questions, quiz submission status, timer, visited questions, and attempted questions.
5. The fetched questions are processed, and choices are shuffled to provide a randomized order for multiple-choice options.
6. color Indication is added for user easyness
7. for styling I have used Tailwind


Description Based on Code Persepective:
1. Initialization of State Variables:

    I initialize several state variables using the useState hook to manage different aspects of the quiz, including the current question, selected answers, quiz questions, quiz submission status, timer, visited questions, and attempted questions.

2. Fetching Quiz Questions:

    I use the useEffect hook to fetch quiz questions from an external API (https://opentdb.com/api.php?amount=15) when the component mounts.
    The fetched questions are processed, and choices are shuffled to provide a randomized order for multiple-choice options.
    The processed questions are stored in the questions state variable.

3. Timer Management:

    Another useEffect hook manages the quiz timer.
    It counts down the time remaining (initialized to 30 minutes) in seconds.
    When the timer reaches 0, it triggers the auto-submission of the quiz and disables the timer.

4. Question Visited Tracking:

    A separate useEffect hook keeps track of visited questions.
    If a question hasn't been visited before, it's added to the visitedQuestions state.

5. Option Selection Handling:

    The handleOptionSelect function is called when a user selects an answer option.
    It updates the selectedAnswers state with the chosen option.
    If the current question hasn't been attempted before, it's added to the attemptedQuestions state.

6. Quiz Submission:

    handleSubmitQuiz is called when the user clicks the "Submit" button.
    It sets the quizSubmitted state to true, indicating that the quiz has been submitted.

7. Quiz Restart:

    handleRestartQuiz is called when the user clicks the "Restart Quiz" button after quiz submission.
    It resets the selectedAnswers, currentQuestion, and quizSubmitted states, allowing the user to start the quiz again.

8. Auto-Submission:

    The timer triggers an auto-submission when it reaches 0, using the handleAutoSubmit function.

9. Rendering Quiz Interface:

    The JSX code renders the quiz interface based on various conditions:
        If the quiz hasn't been submitted (!quizSubmitted), it displays the current question, answer options, navigation buttons (previous, next), and a timer.
        If the quiz is submitted (quizSubmitted), it shows the quiz results, displaying the user's answers and the correct answers for each question.
        The "Restart Quiz" button allows the user to start the quiz again.

10. Styling with Tailwind CSS:

    Tailwind CSS classes are used to style the components and make the user interface visually appealing.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with Ir browser to see the result.

I can start editing the page by modifying `app/page.js`. The page auto-updates as I edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

I can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - Ir feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy Ir Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

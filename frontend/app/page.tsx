"use client";

import { useState } from "react";


type FeatureCardProps = {
  title: string;
  description: string;
};

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
      <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}
  
export default function Home() {

  const [isReady, setIsReady] = useState(true);
  const [task, setTask] = useState("");
  const [submittedTask, setSubmittedTask] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);                                                                            

const handleAnalyzeTask = async () => {
  const cleanedTask = task.trim();

  if (!cleanedTask) {
    setError("Please enter a task before submitting.");
    setSubmittedTask("");
    return;
  }

  setError("");
  setIsSubmitting(true);

  try {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: cleanedTask }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit task.");
    }

    setSubmittedTask(data.task);
  } catch (err) {
    setSubmittedTask("");
    setError(
      err instanceof Error
        ? err.message
        : "Could not connect to the backend."
    );
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-2xl text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
  AI Software Engineering Assistant
</h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
  Analyze repositories, understand software issues, and validate code changes
  with AI-assisted development workflows.
</p>
        </div>
        
<section className="grid w-full gap-4 sm:grid-cols-3">
  
<FeatureCard
  title="Repository Analysis"
  description="Understand project structure, files, and potential issues."
/>

<FeatureCard
  title="AI Task Planning"
  description="Break software tasks into clear, manageable steps."
/>

<FeatureCard
  title="Automated Testing"
  description="Check code changes and identify test failures."
/>

</section>

<section className="w-full rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
  <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
    Project Status
  </h2>

  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
    Development environment is running.
  </p>

  <div className="mt-4 flex items-center gap-2">
    
<span
  className={`h-2.5 w-2.5 rounded-full ${
    isReady ? "bg-green-500" : "bg-red-500"
  }`}
></span>

    <span className="text-sm font-medium">
  {isReady ? "Frontend Ready" : "Frontend Paused"}
</span>
    <button
  onClick={() => setIsReady(!isReady)}
  className="mt-4 rounded-lg border px-4 py-2 text-sm"
>
  Toggle Status
</button>
  </div>
</section>

<section className="w-full rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
  <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
    Create a Task
  </h2>

  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
    Describe a software issue or development task.
  </p>

  <input
    type="text"
    value={task}
    onChange={(event) => setTask(event.target.value)}
    placeholder="e.g. Find why the login API is failing"
    className="mt-4 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-black outline-none focus:border-blue-500 dark:border-zinc-700 dark:text-white"
  />

  
<button
  type="button"
  onClick={handleAnalyzeTask}
  disabled={isSubmitting}
  className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {isSubmitting ? "Submitting..." : "Analyze Task"}
</button>

  {error && (
  <p className="mt-3 text-sm text-red-600" role="alert">
    {error}
  </p>
)}
  {submittedTask && (
  <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
    Submitted task: {submittedTask}
  </p>
)}
</section>

      </main>
    </div>
  );
}

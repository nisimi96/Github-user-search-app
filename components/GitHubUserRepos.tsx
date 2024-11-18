'use client';
import { useState, useEffect } from 'react';

interface GitHubUserReposProps {
  username: string;
  theme: 'light' | 'dark';
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  updated_at: string;
  stargazers_count: number;
}

// Removed duplicate GitHubUserRepos component

const GitHubUserRepos: React.FC<GitHubUserReposProps> = ({ username, theme }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setError(''); // Clear previous errors
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setRepos(data); // Set repositories on success
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || 'An error occurred'); // Handle errors
        } else {
          setError('An error occurred'); // Handle non-Error exceptions
        }
      }
    };

    if (username) fetchRepos(); // Fetch only if username exists
  }, [username]);

  return (
    !username ? (
      <p className="text-[#0079FF]">Please enter a username</p>
    ) : (
      <div className="container flex flex-col justify-center items-center mb-24">
        <h2
          className={`mt-10 font-bold ${theme === 'light' ? 'text-[#2B3442]' : 'text-white'}`}
        >
          Last 3 Repositories
        </h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="flex lg:flex-wrap lg:w-auto gap-10 lg:flex-row flex-col w-full">
            {repos.length > 0 ? (
              repos.map((repo) => (
                <li
                  key={repo.id}
                  className={`mb-4 ${
                    theme === 'light' ? 'bg-[#fefefe]' : 'bg-[#1E2A47]'
                  } py-10 px-6 my-10 rounded-md shadow-md`}
                >
                  <p className="text-blue-600">
                    <strong>{repo.name}</strong>
                  </p>
                  <p className={`mb-5 ${theme === 'light' ? 'text-[#4B6A9B]' : 'text-white'}`}>
                    <strong>Stars:</strong> ⭐ {repo.stargazers_count}
                  </p>
                  <p className={`my-2 ${theme === 'light' ? 'text-[#4B6A9B]' : 'text-white'}`}>
                    {repo.description || 'No description available'}
                  </p>
                  <p className={theme === 'light' ? 'text-[#2B3442]' : 'text-white'}>
                    <strong>Last updated:</strong>{' '}
                    {new Date(repo.updated_at).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 flex gap-2 hover:font-bold mt-10"
                  >
                    View on GitHub{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M12.1715 11L7.51457 6.34311L8.92878 4.92889L15.9999 12L8.92878 19.071L7.51457 17.6568L12.1714 13L2.9996 13.0001L2.99957 11.0001L12.1715 11ZM17.9996 18.9999L17.9996 4.99991H19.9996L19.9996 18.9999H17.9996Z"></path>
                    </svg>
                  </a>
                </li>
              ))
            ) : (
              <p>No repositories found.</p>
            )}
          </ul>
        )}
      </div>
    )
  );
};

export default GitHubUserRepos;

'use client';
import GitHubUserRepos from "@/components/GitHubUserRepos";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import { useEffect, useState } from "react";

interface UserData {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    bio: string | null;
    twitter_username: string | null;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    public_gists: number;
    updated_at: string;
}


export default function Home() {
const [theme, setTheme] = useState<'light' | 'dark'>('light');
const toggleMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
}

// User data state
const [user, setUser] = useState<null | UserData>(null);

// User repos state

// User input state
const [username, setUsername] = useState('');

// Fetch user data
useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error('User not found');
            }
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchUser();
}
, [username]);

//localStorage theme save and load
useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme as 'light' | 'dark');
    }
}, []);

useEffect(() => {
    localStorage.setItem('theme', theme);
}, [theme]);



return (
    <main className={`h-full min-h-screen flex flex-col justify-center items-center px-10 py-10 ${theme === 'light' ? 'bg-[#F6F8FF]' : 'bg-[#141D2F]'}`}>
        <Header 
          theme={theme}
          toggleMode={toggleMode}
          onClick={toggleMode}
        />
        <SearchBar 
          onSearch={setUsername}
          theme={theme}
        />
        <UserCard 
          userData={user}
          theme={theme}
        />
        <GitHubUserRepos 
          username={username}
          theme={theme}
        />
    </main>
);
}

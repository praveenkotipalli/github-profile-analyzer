import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserProfileCard from "./components/UserProfileCard";
import PieChartCard from "./components/PieChartCard";
import LineChartCard from "./components/LineChartCard";
import HeatmapCard from "./components/HeatmapCard";
import { Progress } from "./components/ui/progress";
import { RainbowButton } from "./components/magicui/rainbow-button";
import { RippleButton } from "./components/magicui/ripple-button";
import { PulsatingButton } from "./components/magicui/pulsating-button";
import "./index.css";
import RepoList from "./components/RepoList";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [commitsData, setCommitsData] = useState([]);
  const [commitsDataLoading, setCommitsDataLoading] = useState(true);

  const [reposPerLanguage, setReposPerLanguage] = useState([]);
  const [commitsPerLanguage, setCommitsPerLanguage] = useState([]);

  const handleAnalyze = async () => {
    try {
      const userRes = await axios.get(`https://api.github.com/users/${username}`);
      setUser(userRes.data);

      const repoRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
      setRepos(repoRes.data);

      const langMap = {};
      const commitLangMap = {};
      const commitDayMap = {};

      for (let repo of repoRes.data.slice(0, 5)) {
        const lang = repo.language || "Unknown";
        langMap[lang] = (langMap[lang] || 0) + 1;

        const commitsRes = await axios.get(
          `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=30`
        );

        for (let commit of commitsRes.data) {
          const date = new Date(commit.commit.author.date).toDateString();
          commitDayMap[date] = (commitDayMap[date] || 0) + 1;
          commitLangMap[lang] = (commitLangMap[lang] || 0) + 1;

        }
      }

      setReposPerLanguage(Object.entries(langMap).map(([name, value]) => ({ name, value })));
      setCommitsPerLanguage(Object.entries(commitLangMap).map(([name, value]) => ({ name, value })));
      setCommitsData(Object.entries(commitDayMap).map(([date, count]) => ({ date, count })));
      setCommitsDataLoading(false);
    } catch (error) {
      alert("Error fetching data from GitHub API", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6" style={{backgroundColor:"#"}}>
      <h1 className="font-classic text-3xl text-center">GitHub Profile Analyzer</h1>
      <div className="flex gap-4">
        <Input className="border-3 border-black p-2" placeholder="Enter GitHub Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Button 
  variant="secondary" 
  className="bg-black text-white hover:bg-gray-600 cursor-pointer"  
  onClick={handleAnalyze}
>
  Analyze
</Button>
      </div>

      

      {user && <UserProfileCard user={user} />}

      {commitsDataLoading && user?
      <h1>Loading....</h1>
    :commitsData.length > 0 && <HeatmapCard commitData={Object.fromEntries(commitsData.map(d => [d.date, d.count]))} />}

      {commitsData.length > 0 && <LineChartCard data={commitsData} />}
      <div className="grid md:grid-cols-2 gap-6">
        { (user) && 
          <PieChartCard title="Repos per Language" 
          data={reposPerLanguage} />
        }
        {
          user &&
          <PieChartCard title="Commits per Language" data={commitsPerLanguage} />
        }
        {user && <RepoList repos={repos} /> }
      </div>
    </div>
  );
}

export default App;

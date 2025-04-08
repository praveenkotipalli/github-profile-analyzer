import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // Example component

function RepoList({ repos }) {
  return (
    <div className="w-[125vh]">
      <h2 className="text-xl font-semibold mb-2">Repositories</h2>
      <div className="overflow-x-auto">
        {/* Use flex to arrange the cards horizontally */}
        <div className="flex gap-6">
          {repos.map((repo) => (
            <Card className="border-3 border-black p-2" key={repo.id}>
              <CardContent className="p-4">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium"
                >
                  {repo.name}
                </a>
                <p className="text-sm text-muted-foreground">{repo.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RepoList;

// components/UserProfileCard.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function UserProfileCard({ user }) {
  return (
    <Card className="flex gap-6 p-4 items-center border-3 border-black p-2">
        <Avatar className="rounded-full w-24 h-24 border">
  <AvatarImage src={user.avatar_url} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

      {/* <img
        src={user.avatar_url}
        alt="Avatar"
        className="rounded-full w-24 h-24 border"
      /> */}
      <CardContent className="p-0 ">
        <h2 className="text-xl font-bold">{user.name || user.login}</h2>
        <p className="text-sm text-muted-foreground">{user.public_repos} public repos</p>
        <p className="text-sm text-muted-foreground">
          Joined GitHub {new Date(user.created_at).toLocaleDateString()}
        </p>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline">
          View profile on GitHub
        </a>
      </CardContent>
    </Card>
  );
}

export default UserProfileCard;

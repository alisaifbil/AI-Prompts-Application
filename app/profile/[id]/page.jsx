"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({params}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
    
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if(params?.id) fetchPosts();
  }, []);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s profile page`}
      data={posts}
    />
  );
};

export default UserProfile;

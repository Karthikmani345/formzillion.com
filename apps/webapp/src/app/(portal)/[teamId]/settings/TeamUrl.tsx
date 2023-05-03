"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/ui/Input/SimpleInput";
import Header from "@/ui/Header";
import updateTeam from "@/app/fetch/teams/updateTeam";
import Heading from "./Heading";
import CardFooter from "@/ui/CardFooter";

const TeamUrl = ({ teamSlug }: any) => {
  const [loading, setLoading] = useState<any>(false);
  const router = useRouter();
  const parsedTeam = JSON.parse(teamSlug);
  const [url, setUrl] = useState("");

  const handleSlugChange = () => {
    setLoading(true);
    const response: any = updateTeam({
      teamSlug: parsedTeam.slug,
      teamName: url,
      type: "updateSlug",
    });
    if (response) {
      setLoading(false);
    }
    router.push(`/${url}/settings`);
  };

  return (
    <>
      <div className="p-4 px-6 divide-y divide-gray-300 ">
        <Header title={"Team URL"} />
        <div className="pt-4">
          <Heading
            description="This is your team’s URL namespace on formzillion. Within it,
              your team can inspect their projects, check out any recent
              activity, or configure settings to their liking."
          />
          <div className="flex items-center justify-between my-3">
            <Input
              type="text"
              placeholder={parsedTeam.slug}
              className="border px-3 py-2 w-[20%] dark:bg-black dark:border-gray-800"
              value={`formzillion.com/`}
              onChange={(e) => setUrl(e.target.value)}
              disabled
            />
            <Input
              type="text"
              className="border px-3 py-2 dark:bg-black dark:border-gray-800"
              defaultValue={parsedTeam.slug}
              onChange={(e) => setUrl(e.target.value)}
              maxLength={10}
            />
          </div>
        </div>
      </div>
      <CardFooter
        title={"Please use 36 characters at maximum."}
        btnText={"Save"}
        onClick={handleSlugChange}
        loading={loading}
      />
    </>
  );
};

export default TeamUrl;

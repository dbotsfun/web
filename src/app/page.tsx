"use client";

import Listing from "@/components/shared/bots/list/base";
import Bots from "@/components/shared/bots/list/bots";
import { Input } from "@/components/ui/input";
import { FlameIcon, HashIcon, RotateCcw, SearchIcon, SparklesIcon, TrendingUpIcon } from "lucide-react";

import Card from "@/components/shared/bots/cards/normal";
import Tags from "@/components/shared/bots/list/tags";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GET_FRONT_BOTS } from "@/lib/apollo/queries/bots";
import { GET_TAGS } from "@/lib/apollo/queries/misc";
import { BotObject, Query } from "@/lib/apollo/types/graphql";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const err = useSearchParams().get("err");
  const { data: bots, loading: botsLoading } = useQuery<{ voted: Query["bots"], rated: Query["bots"], recent: Query["bots"] }>(GET_FRONT_BOTS)
  const { data: tags, loading: tagsLoading } = useQuery<Query>(GET_TAGS)

  const [query, setQuery] = useState<string | null>()
  return (
    <>
      {err && <Alert className="my-4" variant={"destructive"}>
        <AlertDescription>{err}</AlertDescription></Alert>}
      <div className="w-full h-96 relative overflow-hidden">
        <div className="relative container grid items-center gap-4 mx-auto no-animation md:grid-cols-2 md:gap-16 md:px-0 z-30 py-28">
          <div className="overflow-x-hidden text-center md:text-left md:overflow-x-visible">
            <h1 className="text-7xl font-black">Discord bot list</h1>
            <p className="text-muted-foreground">Search and seek for hundreds of Discord bots</p>
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex gap-2 items-center">
                <Popover open={!!query && query !== ""}>
                  <PopoverTrigger className="w-full">
                    <Input onChange={(e) => setQuery(e.currentTarget.value)} placeholder="Search for bots" className="h-11 focus-visible:!ring-background focus-visible:!ring-offset-primary" />
                  </PopoverTrigger>
                  <PopoverContent autoFocus={false} align="start" className="w-full">
                    <h1 className="text-2xl font-bold mb-3">Search results</h1>
                    <div className="w-full grid grid-cols-3 gap-3">
                      <Card {...bots?.voted.nodes![0] as BotObject} />
                      <Card {...bots?.voted.nodes![0] as BotObject} />
                      <Card {...bots?.voted.nodes![0] as BotObject} />
                      <Card {...bots?.voted.nodes![0] as BotObject} />
                    </div>
                  </PopoverContent>
                </Popover>
                <Button size={"icon"}>
                  <SearchIcon className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex gap-2">
                <RotateCcw className="text-muted-foreground w-5 h-5 mt-1" />
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold">Recent searches</h2>
                  <p className="text-muted-foreground">bots, tats, mee6</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Listing loading={botsLoading} more="/bots/popular" title="Most voted bots" subtext="This month's most voted bots" Icon={TrendingUpIcon} list={bots?.voted.nodes?.length ? <Bots bots={bots?.voted.nodes} /> : undefined} />
      <Listing loading={botsLoading} more="/bots/trending" title="Most rated bots" subtext="This month's most rated bots" Icon={FlameIcon} list={bots?.rated.nodes?.length ? <Bots bots={bots.rated.nodes} /> : undefined} />
      <Listing loading={botsLoading} more="/bots/recent" title="Most recent bots" subtext="Most recent bots" Icon={SparklesIcon} list={bots?.recent.nodes?.length ? <Bots bots={bots?.recent.nodes} /> : undefined} />
      <Listing loading={tagsLoading} more="/tags" title="Most searched tags" subtext="This month's most searched tags" Icon={HashIcon} list={<Tags tags={tags?.tags.nodes?.map(x => x.name) ?? []} />} />
    </>
  );
}
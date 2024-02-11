"use client";

import Listing from "@/components/shared/bots/list/base";
import Bots from "@/components/shared/bots/list/bots";
import { Input } from "@/components/ui/input";
import { FlameIcon, HashIcon, SearchIcon, SparklesIcon, TrendingUpIcon } from "lucide-react";

import Tags from "@/components/shared/bots/list/tags";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFrontBotsQuery, useTagsQuery } from "@/lib/apollo/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const err = useSearchParams().get("err");
  const { data: bots, loading: botsLoading } = useFrontBotsQuery()
  const { data: tags, loading: tagsLoading } = useTagsQuery()

  const [query, setQuery] = useState<string | null>()
  return (
    <>
      {err && <Alert className="my-4" variant={"destructive"}>
        <AlertDescription>{err}</AlertDescription></Alert>}
      <div className="w-full  relative overflow-hidden">
        <div className="relative grid items-center gap-0 no-animation md:grid-cols-2 z-30 py-10">
          <div className="overflow-x-hidden text-center md:text-left md:overflow-x-visible">
            <h1 className="text-7xl font-black">Discord bot list</h1>
            <p className="text-muted-foreground">A wide range of Discord bots listed for every community needs.</p>
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex gap-2 items-center">
                <Popover open={!!query && query !== ""}>
                  <PopoverTrigger className="w-full">
                    <Input onChange={(e) => setQuery(e.currentTarget.value)} placeholder="Search for bots" className="h-14 focus-visible:!ring-background focus-visible:!ring-offset-primary" />
                  </PopoverTrigger>
                  <PopoverContent autoFocus={false} align="start" className="w-full">
                    <h1 className="text-2xl font-bold mb-3">Search results</h1>
                    <div className="w-full grid grid-cols-3 gap-3">
                      no
                    </div>
                  </PopoverContent>
                </Popover>
                <Button size={"icon"} className="h-14 w-14 rounded-lg">
                  <SearchIcon className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Listing loading={botsLoading} more="/bots/popular" title="Most voted bots" subtext="This month's most voted bots" Icon={TrendingUpIcon} list={bots?.voted.nodes?.length ? <Bots bots={bots?.voted.nodes} /> : undefined} />
      <Listing loading={botsLoading} more="/bots/trending" title="Most rated bots" subtext="This month's most rated bots" Icon={FlameIcon} list={bots?.rated.nodes?.length ? <Bots bots={bots.rated.nodes} /> : undefined} />
      <Listing loading={botsLoading} more="/bots/recent" title="Most recent bots" subtext="Most recent bots" Icon={SparklesIcon} list={bots?.recent.nodes?.length ? <Bots bots={bots?.recent.nodes} /> : undefined} />
      <Listing loading={tagsLoading} more="/tags" title="Most searched tags" subtext="This month's most searched tags" Icon={HashIcon} list={tags?.tags.nodes?.length ? <Tags tags={tags.tags.nodes.map(x => x.name)} /> : undefined} />
    </>
  );
}
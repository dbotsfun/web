"use client";

import ApprovedBotsActions from '@/components/shared/bots/panel-actions/approved-bots';
import DeniedBotsActions from '@/components/shared/bots/panel-actions/denied-bots';
import PendingBotsActions from '@/components/shared/bots/panel-actions/pending-bots';
import LoadingScreen from '@/components/shared/common/loading-screen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BotStatus, usePanelBotsQuery } from '@/lib/apollo/types'
import { avatar } from '@/lib/utils';
import { CheckIcon, ClockIcon, FaceFrownIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

interface Filters {
    status: BotStatus
}

export default function Page() {
    const [filters, setFilters] = useState<Filters>({
        status: BotStatus.Approved
    })
    const { data: bots, loading, refetch } = usePanelBotsQuery({
        variables: {
            status: filters.status
        }
    })

    useEffect(() => {
        refetch({
            ...filters
        })
    }, [filters])

    return <div className='flex flex-col gap-3'>
        <div className='flex justify-between w-full items-center sticky top-24 bg-background/10 backdrop-blur z-10 p-3 rounded-xl'>
            <Input className='w-1/4' placeholder='Search bots' />
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"secondary"}>
                        Status <FunnelIcon className='w-4 h-4 ml-2' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className='w-60'>
                    <div className='flex flex-col gap-1 w-full'>
                        <Button variant={"secondary"} size={"sm"} onClick={(e) => setFilters({ status: BotStatus[e.currentTarget.value as BotStatus] })} className='w-full justify-between' value={"Approved"}>
                            Approved
                            <CheckIcon className='w-5 h-5' />
                        </Button>
                        <Button variant={"secondary"} size={"sm"} onClick={(e) => setFilters({ status: BotStatus[e.currentTarget.value as BotStatus] })} className='w-full justify-between' value={"Denied"}>
                            Denied
                            <XMarkIcon className='w-5 h-5' />
                        </Button>
                        <Button variant={"secondary"} size={"sm"} onClick={(e) => setFilters({ status: BotStatus[e.currentTarget.value as BotStatus] })} className='w-full justify-between' value={"Pending"}>
                            Pending
                            <ClockIcon className='w-5 h-5' />
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
        {loading ? <LoadingScreen /> : bots?.bots.nodes?.length ? <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Bot</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bots.bots.nodes.map(bot => <TableRow key={bot.id}>
                    <TableCell>
                        <div className='flex flex-row items-center gap-2'>
                            <img alt="bot avatar" src={avatar(bot.avatar, bot.id)} className='w-7 h-7 rounded-full' />{bot.name}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className='flex flex-row items-center gap-2'>
                            <img alt="bot avatar" src={avatar(bot.owners[0].avatar, bot.owners[0].id)} className='w-7 h-7 rounded-full' />{bot.owners[0].username}
                        </div>
                    </TableCell>
                    <TableCell className='lowercase'>{bot.status}</TableCell>
                    <TableCell className="justify-end flex">
                        {bot.status === "APPROVED" ? <ApprovedBotsActions id={bot.id} /> : bot.status === "DENIED" ? <DeniedBotsActions id={bot.id} /> : <PendingBotsActions id={bot.id} />}
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table> : <div className="flex items-center justify-center h-32 font-bold text-red-500">
            <FaceFrownIcon className="w-5 mr-2" /> No {filters.status.toLowerCase()} bots
        </div>}
    </div>
}
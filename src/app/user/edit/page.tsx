"use client";

import LoadingScreen from "@/components/shared/common/loading-screen";
import ReturnButton from "@/components/shared/common/return-button";
import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEditUserMutation, useUserLazyQuery } from "@/lib/apollo/types";
import { useSession } from "@/lib/hooks/use-session";
import { Loader2Icon } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	vanity: z
		.string()
		.min(2, "Vanity must be at least 2 characters long")
		.max(15, "Vanity must be less than 15 characters long")
		.toLowerCase()
		.optional(),
	bio: z
		.string()
		.min(1, "Bio must be at least 1 character long")
		.max(200, "Bio must be less than 200 characters long"),
	banner: z.string().url().optional(),
});

export default function Page() {
	const { data: auth, loading: gettingAuth } = useSession();
	const [values, setValues] = useState<Partial<z.infer<typeof formSchema>>>({});
	const [getUser, user] = useUserLazyQuery();
	const [edit, editResult] = useEditUserMutation({
		onCompleted: () => toast.success("Updated profile information"),
		onError: (error) => toast.error(error.message)
	});

	useEffect(() => {
		if (auth)
			getUser({
				variables: {
					userId: auth.me.user.id,
				},
			});
	}, [auth]);

	function onSubmit(values: Partial<z.infer<typeof formSchema>>) {
		edit({
			variables: {
				input: {
					banner: values.banner,
					bio: values.bio,
				},
			},
		});
	}

	if (user.loading || gettingAuth) return <LoadingScreen />;
	if (user.called && !user.loading && !user.data) return notFound();
	return (
		<div className="mx-auto max-w-4xl py-12">
			<ReturnButton />
			<Card>
				<CardHeader className="border-b">
					<CardTitle>User settings</CardTitle>
				</CardHeader>
				<CardContent className="mt-5">
					<AutoForm
						values={values}
						onParsedValuesChange={setValues}
						onSubmit={() => onSubmit(values)}
						formSchema={formSchema}
						fieldConfig={{
							bio: {
								inputProps: {
									placeholder: "A nice bio to describe yourself",
									defaultValue: user.data?.user.bio ?? undefined,
								},
							},
							vanity: {
								description: "Vanities make your dbots account more unique.",
								inputProps: {
									disabled: true,
									"aria-disabled": true,
									placeholder: "E.g: simxnet",
									defaultValue: undefined,
								},
							},
							banner: {
								description: "The optimal dimensions for a banner are 1100x360",
								inputProps: {
									placeholder: "https://imgur...",
									defaultValue: user.data?.user.banner ?? undefined,
								},
							},
						}}
					>
						<Button
							className="mt-4 gap-2"
							disabled={editResult.loading}
							aria-disabled={editResult.loading}
						>
							{editResult.loading && (
								<Loader2Icon className="w-5 h-5 animate-spin" />
							)}
							Save
						</Button>
					</AutoForm>
				</CardContent>
			</Card>
		</div>
	);
}

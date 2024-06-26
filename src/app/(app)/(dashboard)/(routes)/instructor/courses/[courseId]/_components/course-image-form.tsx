"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import * as z from "zod";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";

import { Course } from "@prisma/client";

import { UniversalUpload } from "@/components/universal-upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type CourseImageFormProps = {
	initialData: Course;
	courseId: string;
};

const formSchema = z.object({
	imageUrl: z.string().min(1, {
		message: "The course image is required.",
	}),
});

export const CourseImageForm = ({ initialData, courseId }: CourseImageFormProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const router = useRouter();

	const { toast } = useToast();

	const toggleEdit = () => setIsEditing((current) => !current);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/courses/${courseId}`, values);

			toast({
				title: "Course updated",
				description: "The course image has been successfully updated.",
				duration: 5000,
				className: "success-toast",
			});

			toggleEdit();

			router.refresh();
		} catch {
			toast({
				title: "Something went wrong",
				description: "An unknown error has occurred.",
				duration: 5000,
				className: "error-toast",
			});
		}
	};

	return (
		<div className="mt-6 rounded-md border bg-slate-100 p-4">
			<div className="flex items-center justify-between font-medium">
				Course image
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing && <>Cancel</>}

					{!isEditing && !initialData.imageUrl && (
						<>
							<PlusCircle className="mr-2 h-4 w-4" />
							Add an image
						</>
					)}

					{!isEditing && initialData.imageUrl && (
						<>
							<Pencil className="mr-2 h-4 w-4" />
							Edit image
						</>
					)}
				</Button>
			</div>

			{!isEditing &&
				(!initialData.imageUrl ? (
					<div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
						<ImageIcon className="h-10 w-10 text-slate-500" />
					</div>
				) : (
					<div className="relative mt-2 aspect-video">
						<Image
							alt="Upload"
							fill
							className="rounded-md object-cover"
							src={initialData.imageUrl}
						/>
					</div>
				))}

			{isEditing && (
				<div>
					<UniversalUpload
						endpoint="courseImage"
						onChange={(url) => {
							if (url) {
								onSubmit({ imageUrl: url });
							}
						}}
					/>

					<div className="mt-4 text-xs text-muted-foreground">
						16:9 aspect ratio is recommended.
					</div>
				</div>
			)}
		</div>
	);
};

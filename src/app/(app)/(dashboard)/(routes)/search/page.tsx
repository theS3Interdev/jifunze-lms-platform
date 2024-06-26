import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/data/db";

import { getCourses } from "@/lib/actions/get-courses";

import { SearchInput } from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";
import { Categories } from "./_components/categories";

type SearchPageProps = {
	searchParams: {
		title: string;
		categoryId: string;
	};
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const { userId } = auth();

	if (!userId) {
		return redirect("/search");
	}

	const categories = await db.category.findMany({
		orderBy: {
			name: "asc",
		},
	});

	const courses = await getCourses({
		userId,
		...searchParams,
	});

	return (
		<>
			<div className="block px-6 pt-6 md:mb-0 md:hidden">
				<SearchInput />
			</div>

			<div className="space-y-4 p-6">
				<Categories items={categories} />

				<CoursesList items={courses} />
			</div>
		</>
	);
};

export default SearchPage;

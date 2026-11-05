
"use client";

import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label,
    LabelList,
    type BarShapeProps,
    type LabelProps,
} from "recharts";
import MotionWrapper from "@/components/MotionWrapper";

type CategoryData = {
    category: string;
    totalBooks: number;
};

const colors = [
    "#8884d8", // Purple
    "#82ca9d", // Green
    "#ffc658", // Yellow
    "#ff8042", // Orange
    "#0088fe", // Blue
];

const getPath = (
    x: number,
    y: number,
    width: number,
    height: number
) => {
    return `M${x},${y + height}
    C${x + width / 3},${y + height}
    ${x + width / 2},${y + height / 3}
    ${x + width / 2},${y}
    C${x + width / 2},${y + height / 3}
    ${x + (2 * width) / 3},${y + height}
    ${x + width},${y + height}
    Z`;
};

const TriangleBar = (props: BarShapeProps) => {
  const { x, y, width, height, index, isActive } = props;

  const color = colors[(index ?? 0) % colors.length];

  return (
    <path
      d={getPath(
        Number(x),
        Number(y),
        Number(width),
        Number(height)
      )}
      stroke={color}
      strokeWidth={isActive ? 3 : 0}
      fill={color}
      style={{ transition: "stroke-width 0.3s ease-out" }}
    />
  );
};
const CustomColorLabel = (props: LabelProps) => {
    const fill = colors[(props.index ?? 0) % colors.length];

    return <Label {...props} fill={fill} />;
};

export default function TopCategories() {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(
                    /\/$/,
                    ""
                );

                if (!baseUrl) {
                    throw new Error("API URL is not configured.");
                }

                const response = await fetch(`${baseUrl}/top-categories`);

                if (!response.ok) {
                    throw new Error("Failed to fetch categories.");
                }

                const data: CategoryData[] = await response.json();

                setCategories(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="bg-[#fbf8f1]">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-18">
                <MotionWrapper>
                    <div className="mb-10 text-center">
                        <p className="text-sm font-semibold tracking-wider text-[#8c7350] dark:text-muted-foreground">
                            EXPLORE OUR COLLECTION
                        </p>

                        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#263b30] dark:text-white sm:text-4xl">
                            Top Categories
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#68736a] dark:text-muted-foreground sm:text-base">
                            Discover the most popular book categories in our library.
                        </p>
                    </div>
                </MotionWrapper>

                <MotionWrapper delay={0.15}>
                    <div className="mx-auto max-w-4xl rounded-2xl border border-[#e9e2d8] bg-white p-5 shadow-sm dark:border-border dark:bg-card sm:p-8">
                        {loading ? (
                            <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
                                Loading category statistics...
                            </div>
                        ) : error ? (
                            <div className="flex h-72 items-center justify-center text-sm text-red-500">
                                {error}
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
                                No category data available.
                            </div>
                        ) : (
                            <div className="w-full">
                                <BarChart
                                    style={{
                                        width: "100%",
                                        maxHeight: 380,
                                        aspectRatio: 1.618,
                                    }}
                                    responsive
                                    data={categories}
                                    margin={{
                                        top: 25,
                                        right: 15,
                                        left: 0,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="currentColor"
                                        opacity={0.12}
                                    />

                                    <Tooltip
                                        cursor={{ fill: "#068a3f", fillOpacity: 0.08 }}
                                        formatter={(value) => [
                                            `${value} `,
                                            "Total Books",
                                        ]}
                                    />

                                    <XAxis
                                        dataKey="category"
                                        tick={{ fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <YAxis
                                        allowDecimals={false}
                                        width="auto"
                                        tick={{ fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <Bar dataKey="totalBooks" shape={TriangleBar} activeBar>
                                        <LabelList
                                            dataKey="totalBooks"
                                            content={CustomColorLabel}
                                            position="top"
                                        />
                                    </Bar>
                                </BarChart>
                            </div>
                        )}
                    </div>
                </MotionWrapper>
            </div>
        </section>
    );
}

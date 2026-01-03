/**
 * Home Page
 * 
 * Main feed showing ideas list.
 */

"use client";

import { useState } from "react";
import { Header } from "@/components/layout";
import { IdeasList, FilterTabs } from "@/components/ideas";

export default function HomePage() {
  const [sort, setSort] = useState<"latest" | "popular" | "controversial">("latest");

  return (
    <>
      <Header />
      <main className="main-container">
        <div className="page-header">
          <h1 className="page-title">mupoll</h1>
          <p className="page-description">Share your ideas, get feedback</p>
        </div>

        <FilterTabs value={sort} onChange={setSort} />

        <IdeasList sort={sort} />
      </main>
    </>
  );
}

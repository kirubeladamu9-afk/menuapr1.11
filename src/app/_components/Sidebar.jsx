import { Suspense } from "react";

import { SidebarContent } from '@components/SidebarContent';

import { getSortedArchivesData } from "@library/archives";
import { getSortedCategoriesData } from "@library/categories";
import { getSortedTagsData } from "@library/tags";
import { getSortedAuthorsData } from "@library/authors";

async function Sidebar() {
  const archives = await getAllArchives();
  const categories = await getAllCategories();
  const tags = await getAllTags();
  const authors = await getAllAuthors();

  return (
    <SidebarContent
      categories={categories}
      archives={archives}
      authors={authors}
      tags={tags}
    />
  );
};
export default Sidebar;

async function getAllArchives() {
    const archivesData = await getSortedArchivesData()

    if ( !archivesData ) {
        return [];
    } else {
        return archivesData
    }
}

async function getAllCategories() {
    const categoriesData = await getSortedCategoriesData()

    if ( !categoriesData ) {
        return [];
    } else {
        return categoriesData
    }
}

async function getAllTags() {
    const tagsData = await getSortedTagsData()

    if ( !tagsData ) {
        return [];
    } else {
        return tagsData
    }
}

async function getAllAuthors() {
    const authorsData = await getSortedAuthorsData()

    if ( !authorsData ) {
        return [];
    } else {
        return authorsData
    }
}

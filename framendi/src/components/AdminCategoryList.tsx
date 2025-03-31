"use client";

import { useState } from "react";
import { Category } from "@/types";
import { deleteCategory } from "@/lib/categories";

type AdminCategoryListProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: () => void;
};

export default function AdminCategoryList({
  categories,
  onEdit,
  onDelete,
}: AdminCategoryListProps) {
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleDelete = async (category: Category) => {
    if (
      !confirm(`Ertu viss um að þú viljir eyða flokknum: "${category.name}`)
    ) {
      return;
    }
    setLoading(category.id);
    setError("");

    try {
      const response = await deleteCategory(category.slug);
      if (!response.ok) {
        throw new Error(response.error || "Villa við að eyða flokk");
      }
      onDelete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Villa hefur skéð");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="mid-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-slate-600 rounded-lg">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nafn flokks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                Aðgerðir
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-700 divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {category.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{category.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-blue-600 hover:text-blue-900 mr-4 transform transition duration-300 hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
                    disabled={loading === category.id}
                    className="text-red-600 hover:text-red-900 disabled:text-gray-400 transform transition duration-300 hover:scale-105"
                  >
                    {loading === category.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

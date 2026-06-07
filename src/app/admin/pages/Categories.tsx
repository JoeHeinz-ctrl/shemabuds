import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { getCategories, deleteCategory, addCategory } from "../../../services/productService";

export function Categories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    const cats = await getCategories();
    setCategories(cats);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setLoading(true);
    try {
      const success = await addCategory(newCategory.trim());
      if (success) {
        setNewCategory("");
        await loadCategories();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (cat: string) => {
    await deleteCategory(cat);
    // Refresh list after deletion
    await loadCategories();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-[#2A1B14]">Manage Categories</h1>
        <div className="flex gap-2">
          <input
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            placeholder="New category"
            className="flex-1 px-3 py-2 border rounded"
          />
          <Button 
            onClick={handleAddCategory} 
            disabled={loading}
            className="bg-[#A67C52] text-white"
          >
            <Plus className="w-4 h-4 mr-1" /> {loading ? "Adding..." : "Add"}
          </Button>
        </div>
        <ul className="space-y-2">
          {categories.map(cat => (
            <li key={cat} className="flex items-center justify-between p-2 bg-white rounded shadow">
              <span>{cat}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteCategory(cat)}
                className="border-red-500 text-red-500"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}

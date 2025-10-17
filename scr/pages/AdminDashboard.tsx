import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Trash2, Edit, Package, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image: string;
  category: string;
  description: string | null;
  is_new: boolean;
  is_best_seller: boolean;
}

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  product_name: string;
  product_price: number;
  order_status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    original_price: "",
    image: "",
    category: "",
    description: "",
    is_new: false,
    is_best_seller: false,
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchProducts();
      fetchOrders();
    }
  }, [user, isAdmin]);

  const fetchProducts = async () => {
    const { data, error } = await (supabase as any)
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
      return;
    }

    setProducts(data || []);
  };

  const fetchOrders = async () => {
    const { data, error } = await (supabase as any)
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
      return;
    }

    setOrders(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      image: formData.image,
      category: formData.category,
      description: formData.description || null,
      is_new: formData.is_new,
      is_best_seller: formData.is_best_seller,
    };

    if (editingProduct) {
      const { error } = await (supabase as any)
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update product",
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Success", description: "Product updated successfully" });
    } else {
      const { error } = await (supabase as any).from("products").insert(productData);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add product",
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Success", description: "Product added successfully" });
    }

    setIsAddDialogOpen(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      original_price: "",
      image: "",
      category: "",
      description: "",
      is_new: false,
      is_best_seller: false,
    });
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await (supabase as any).from("products").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Success", description: "Product deleted successfully" });
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      original_price: product.original_price?.toString() || "",
      image: product.image,
      category: product.category,
      description: product.description || "",
      is_new: product.is_new,
      is_best_seller: product.is_best_seller,
    });
    setIsAddDialogOpen(true);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await (supabase as any)
      .from("orders")
      .update({ order_status: newStatus })
      .eq("id", orderId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Success", description: "Order status updated" });
    fetchOrders();
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="products">
              <Package className="mr-2 h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Products Management</h2>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingProduct(null);
                    setFormData({
                      name: "",
                      price: "",
                      original_price: "",
                      image: "",
                      category: "",
                      description: "",
                      is_new: false,
                      is_best_seller: false,
                    });
                  }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? "Edit Product" : "Add New Product"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="original_price">Original Price</Label>
                        <Input
                          id="original_price"
                          type="number"
                          step="0.01"
                          value={formData.original_price}
                          onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL *</Label>
                      <Input
                        id="image"
                        required
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="men">Men</SelectItem>
                          <SelectItem value="women">Women</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.is_new}
                          onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                          className="rounded"
                        />
                        <span className="text-sm">Mark as New</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.is_best_seller}
                          onChange={(e) => setFormData({ ...formData, is_best_seller: e.target.checked })}
                          className="rounded"
                        />
                        <span className="text-sm">Mark as Best Seller</span>
                      </label>
                    </div>
                    <Button type="submit" className="w-full">
                      {editingProduct ? "Update Product" : "Add Product"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id} className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold">Rs. {Number(product.price).toLocaleString()}</span>
                        {product.original_price && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs. {Number(product.original_price).toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {product.is_new && <Badge>New</Badge>}
                        {product.is_best_seller && <Badge variant="secondary">Best Seller</Badge>}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <h2 className="text-2xl font-semibold mb-6">Orders Management</h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer_phone}</p>
                          <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                          <p className="text-sm text-muted-foreground">{order.customer_address}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.product_name}</TableCell>
                      <TableCell>Rs. {Number(order.product_price).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.order_status === "delivered"
                              ? "default"
                              : order.order_status === "cancelled"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {order.order_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.order_status}
                          onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

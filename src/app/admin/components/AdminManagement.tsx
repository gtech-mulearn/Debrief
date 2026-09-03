"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Trash2, UserPlus, Shield } from "lucide-react";

interface AdminUser {
    email: string;
    created_at: string;
}

export function AdminManagement() {
    const [admins, setAdmins] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [newEmail, setNewEmail] = useState("");
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const res = await fetch("/api/admin/admins");
            if (!res.ok) throw new Error("Failed to fetch admins");
            const data = await res.json();
            setAdmins(data);
        } catch (error) {
            console.error(error);
            toast.error("Error loading admin list");
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail) return;

        try {
            setAdding(true);
            const res = await fetch("/api/admin/admins", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: newEmail }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to add admin");
            }

            toast.success("Admin added successfully");
            setNewEmail("");
            fetchAdmins();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Error adding admin");
        } finally {
            setAdding(false);
        }
    };

    const handleRemove = async (email: string) => {
        if (!confirm(`Are you sure you want to remove ${email} from admins?`)) return;

        try {
            const res = await fetch("/api/admin/admins", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error("Failed to remove admin");

            toast.success("Admin removed");
            setAdmins(prev => prev.filter(a => a.email !== email));
        } catch (error) {
            toast.error("Error removing admin");
        }
    };

    return (
        <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-full">
                        <Shield className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                        <CardTitle>Admin Access Management</CardTitle>
                        <CardDescription>Control who can access this dashboard and create simulations.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Add Admin Form */}
                <form onSubmit={handleAdd} className="flex gap-4">
                    <Input
                        type="email"
                        placeholder="new.admin@example.com"
                        value={newEmail}
                        onChange={e => setNewEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        required
                    />
                    <Button type="submit" disabled={adding}>
                        {adding ? "Adding..." : <><UserPlus className="w-4 h-4 mr-2" /> Add Admin</>}
                    </Button>
                </form>

                {/* Admin List */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Authorized Admins</h3>
                    {loading ? (
                        <div className="text-sm text-muted-foreground animate-pulse">Loading...</div>
                    ) : (
                        <div className="grid gap-2">
                            {admins.map((admin) => (
                                <div key={admin.email} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-300">
                                            {admin.email[0].toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-white">{admin.email}</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                        onClick={() => handleRemove(admin.email)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

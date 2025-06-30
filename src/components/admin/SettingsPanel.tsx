import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Mail, Bell, Zap, Edit2, Trash2, Plus, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logout from '../Logout';

const initialTemplates = {
  welcome: "Welcome to our platform, {{name}}!",
  bid: "Your bid of {{amount}} has been received.",
  moderation: "Your content was flagged for review. Please check your dashboard.",
};

const initialPlans = [
  { id: 1, name: "Free", users: 1, startups: 1, price: "$0", features: ["Basic Support"] },
  { id: 2, name: "Pro", users: 5, startups: 3, price: "$29", features: ["Priority Support", "Advanced Analytics"] },
  { id: 3, name: "Enterprise", users: 50, startups: 20, price: "$199", features: ["Dedicated Manager", "Custom Integrations"] },
];

export default function SettingsPanel() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    digest: "daily",
  });
  const [featureFlags, setFeatureFlags] = useState({
    experimentalUI: false,
    aiSuggestions: true,
    betaPayments: false,
  });
  const [plans, setPlans] = useState(initialPlans);
  const [editPlan, setEditPlan] = useState<any>(null);
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: "", users: 1, startups: 1, price: "", features: "" });
  const [showResetDialog, setShowResetDialog] = useState(false);
  const navigate = useNavigate();

  // Handlers
  const handleTemplateChange = (key: string, value: string) => {
    setTemplates((t) => ({ ...t, [key]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean | string) => {
    setNotifications((n) => ({ ...n, [key]: value }));
  };

  const handleFeatureFlagChange = (key: string, value: boolean) => {
    setFeatureFlags((f) => ({ ...f, [key]: value }));
  };

  const handlePlanEdit = (plan: any) => setEditPlan(plan);
  const handlePlanSave = () => setEditPlan(null);
  const handlePlanDelete = (id: number) => setPlans(plans.filter((p) => p.id !== id));

  // Add Plan
  const handleAddPlan = () => {
    if (!newPlan.name || !newPlan.price) return;
    setPlans([
      ...plans,
      {
        id: plans.length ? Math.max(...plans.map(p => p.id)) + 1 : 1,
        name: newPlan.name,
        users: Number(newPlan.users),
        startups: Number(newPlan.startups),
        price: newPlan.price,
        features: newPlan.features.split(",").map(f => f.trim()).filter(Boolean),
      },
    ]);
    setNewPlan({ name: "", users: 1, startups: 1, price: "", features: "" });
    setShowAddPlan(false);
  };

  // Reset All Settings
  const handleResetAll = () => {
    setTemplates(initialTemplates);
    setNotifications({
      email: true,
      sms: false,
      push: true,
      digest: "daily",
    });
    setFeatureFlags({
      experimentalUI: false,
      aiSuggestions: true,
      betaPayments: false,
    });
    setPlans(initialPlans);
    setShowResetDialog(false);
  };

  return (
    <div className="space-y-10 p-6 bg-gradient-to-br from-blue-50 via-white to-fuchsia-50 min-h-screen max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <SettingsIcon className="w-10 h-10 text-blue-500" />
        <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">Settings Panel</h1>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-4">
        <Button variant="destructive" onClick={() => setShowResetDialog(true)}>
          <X className="w-4 h-4 mr-1" /> Reset All Settings
        </Button>
        <Logout />
      </div>

      {/* Email Templates */}
      <Card className="shadow-lg border-0 bg-white/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Mail className="w-5 h-5" />
            Email Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(templates).map(([key, value]) => (
            <div key={key}>
              <label className="block font-semibold capitalize mb-1">{key} Email</label>
              <textarea
                className="w-full border rounded p-2 text-sm bg-blue-50/50"
                rows={2}
                value={value}
                onChange={e => handleTemplateChange(key, e.target.value)}
              />
            </div>
          ))}
          <Button variant="outline" className="mt-2">
            <Save className="w-4 h-4 mr-1" /> Save Templates
          </Button>
        </CardContent>
      </Card>

      {/* Notification Rules */}
      <Card className="shadow-lg border-0 bg-white/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-fuchsia-700">
            <Bell className="w-5 h-5" />
            Notification Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Switch
              checked={notifications.email}
              onCheckedChange={v => handleNotificationChange("email", v)}
            />
            <span>Email Notifications</span>
          </div>
          <div className="flex items-center gap-4">
            <Switch
              checked={notifications.sms}
              onCheckedChange={v => handleNotificationChange("sms", v)}
            />
            <span>SMS Notifications</span>
          </div>
          <div className="flex items-center gap-4">
            <Switch
              checked={notifications.push}
              onCheckedChange={v => handleNotificationChange("push", v)}
            />
            <span>Push Notifications</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Digest Frequency:</span>
            <select
              className="border rounded px-2 py-1"
              value={notifications.digest}
              onChange={e => handleNotificationChange("digest", e.target.value)}
            >
              <option value="immediate">Immediate</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Feature Flags */}
      <Card className="shadow-lg border-0 bg-white/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Zap className="w-5 h-5" />
            Feature Flags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(featureFlags).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <Checkbox
                checked={value}
                onCheckedChange={v => handleFeatureFlagChange(key, v as boolean)}
                id={key}
              />
              <label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
              <Badge variant={value ? "default" : "outline"} className="ml-2">
                {value ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Reset All Settings Dialog */}
      <Dialog open={showResetDialog} onOpenChange={() => setShowResetDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset All Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-red-600">Are you sure you want to reset all settings to default? This cannot be undone.</p>
            <Button variant="destructive" className="w-full" onClick={handleResetAll}>
              <X className="w-4 h-4 mr-1" /> Confirm Reset
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
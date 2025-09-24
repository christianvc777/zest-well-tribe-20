import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Shield, Palette, Globe, HelpCircle, LogOut } from "lucide-react";
import { toast } from "sonner";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const [settings, setSettings] = useState({
    notifications: {
      workouts: true,
      achievements: true,
      social: false,
      marketing: false
    },
    privacy: {
      publicProfile: true,
      showActivity: true,
      shareStats: false
    },
    preferences: {
      darkMode: false,
      language: "es",
      units: "metric"
    }
  });

  const handleToggle = (category: keyof typeof settings, key: string) => {
    setSettings(prev => {
      const updatedCategory = { ...prev[category] };
      (updatedCategory as any)[key] = !(updatedCategory as any)[key];
      return {
        ...prev,
        [category]: updatedCategory
      };
    });
    toast.success("Configuración actualizada");
  };

  const settingSections = [
    {
      title: "Notificaciones",
      icon: Bell,
      items: [
        { key: "workouts", label: "Recordatorios de entrenamiento", category: "notifications" },
        { key: "achievements", label: "Logros y medallas", category: "notifications" },
        { key: "social", label: "Actividad social", category: "notifications" },
        { key: "marketing", label: "Promociones y ofertas", category: "notifications" }
      ]
    },
    {
      title: "Privacidad",
      icon: Shield,
      items: [
        { key: "publicProfile", label: "Perfil público", category: "privacy" },
        { key: "showActivity", label: "Mostrar actividad reciente", category: "privacy" },
        { key: "shareStats", label: "Compartir estadísticas", category: "privacy" }
      ]
    },
    {
      title: "Preferencias",
      icon: Palette,
      items: [
        { key: "darkMode", label: "Modo oscuro", category: "preferences" }
      ]
    }
  ];

  const actionButtons = [
    { label: "Idioma", icon: Globe, action: () => toast.info("Próximamente disponible") },
    { label: "Ayuda y soporte", icon: HelpCircle, action: () => toast.info("Contacta a soporte@wellness.com") },
    { label: "Cerrar sesión", icon: LogOut, action: () => toast.info("Funcionalidad en desarrollo"), variant: "destructive" as const }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Configuración</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {settingSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-3">
              <div className="flex items-center space-x-2">
                <section.icon className="h-4 w-4 text-primary" />
                <h3 className="font-medium">{section.title}</h3>
              </div>
              
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <Label htmlFor={item.key} className="text-sm cursor-pointer">
                      {item.label}
                    </Label>
                    <Switch
                      id={item.key}
                      checked={(settings as any)[item.category][item.key]}
                      onCheckedChange={() => handleToggle(item.category as keyof typeof settings, item.key)}
                    />
                  </div>
                ))}
              </div>
              
              {sectionIndex < settingSections.length - 1 && <Separator />}
            </div>
          ))}

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-3">
            <h3 className="font-medium">Acciones</h3>
            {actionButtons.map((button) => (
              <Button
                key={button.label}
                variant={button.variant || "outline"}
                onClick={button.action}
                className="w-full justify-start"
              >
                <button.icon className="h-4 w-4 mr-2" />
                {button.label}
              </Button>
            ))}
          </div>

          {/* Close Button */}
          <Button variant="outline" onClick={onClose} className="w-full">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
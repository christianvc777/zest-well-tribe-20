import { useState } from "react";
import { X, Calendar, Clock, MapPin, DollarSign, Users, Image, Wifi, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { useToast } from "@/hooks/use-toast";

interface CreateEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated?: (event: any) => void;
}

export default function CreateEventDialog({
  isOpen,
  onClose,
  onEventCreated
}: CreateEventDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "Presencial",
    category: "",
    price: "",
    maxAttendees: "",
    instructor: "",
    difficulty: "Principiante",
    isPublic: true,
    requiresApproval: false,
    image: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      type: formData.type,
      category: formData.category,
      price: formData.price || "Gratis",
      attendees: 0,
      maxAttendees: parseInt(formData.maxAttendees) || 50,
      instructor: formData.instructor,
      difficulty: formData.difficulty,
      rating: 0,
      image: imagePreview,
      isPublic: formData.isPublic,
      requiresApproval: formData.requiresApproval,
      createdAt: new Date().toISOString(),
      status: "Próximo"
    };

    if (onEventCreated) {
      onEventCreated(newEvent);
    }

    toast({
      title: "¡Evento creado!",
      description: "Tu evento ha sido creado exitosamente y está disponible para inscripciones",
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      type: "Presencial",
      category: "",
      price: "",
      maxAttendees: "",
      instructor: "",
      difficulty: "Principiante",
      isPublic: true,
      requiresApproval: false,
      image: null
    });
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Crear Nuevo Evento</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <form onSubmit={handleSubmit} className="space-y-6 p-1">
            {/* Información básica */}
            <MobileCard variant="elevated">
              <MobileCardHeader>
                <MobileCardTitle>Información Básica</MobileCardTitle>
              </MobileCardHeader>
              <MobileCardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Evento *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Ej: Yoga al Amanecer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe tu evento..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yoga">Yoga</SelectItem>
                        <SelectItem value="Cardio">Cardio</SelectItem>
                        <SelectItem value="Fuerza">Fuerza</SelectItem>
                        <SelectItem value="Funcional">Funcional</SelectItem>
                        <SelectItem value="Baile">Baile</SelectItem>
                        <SelectItem value="Pilates">Pilates</SelectItem>
                        <SelectItem value="Crossfit">Crossfit</SelectItem>
                        <SelectItem value="Natación">Natación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Dificultad</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Principiante">Principiante</SelectItem>
                        <SelectItem value="Intermedio">Intermedio</SelectItem>
                        <SelectItem value="Avanzado">Avanzado</SelectItem>
                        <SelectItem value="Todos los niveles">Todos los niveles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </MobileCardContent>
            </MobileCard>

            {/* Fecha y ubicación */}
            <MobileCard variant="elevated">
              <MobileCardHeader>
                <MobileCardTitle>Fecha y Ubicación</MobileCardTitle>
              </MobileCardHeader>
              <MobileCardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Hora *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Dirección del evento"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Modalidad</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Presencial">Presencial</SelectItem>
                      <SelectItem value="Virtual">Virtual</SelectItem>
                      <SelectItem value="Híbrido">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </MobileCardContent>
            </MobileCard>

            {/* Detalles adicionales */}
            <MobileCard variant="elevated">
              <MobileCardHeader>
                <MobileCardTitle>Detalles Adicionales</MobileCardTitle>
              </MobileCardHeader>
              <MobileCardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="Gratis o monto"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees">Cupo máximo</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      value={formData.maxAttendees}
                      onChange={(e) => handleInputChange("maxAttendees", e.target.value)}
                      placeholder="50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor/Organizador</Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) => handleInputChange("instructor", e.target.value)}
                    placeholder="Nombre del instructor"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Imagen del Evento</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </MobileCardContent>
            </MobileCard>

            {/* Configuración */}
            <MobileCard variant="elevated">
              <MobileCardHeader>
                <MobileCardTitle>Configuración</MobileCardTitle>
              </MobileCardHeader>
              <MobileCardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isPublic">Evento público</Label>
                    <p className="text-xs text-muted-foreground">Visible para todos los usuarios</p>
                  </div>
                  <Switch
                    id="isPublic"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requiresApproval">Requiere aprobación</Label>
                    <p className="text-xs text-muted-foreground">Las inscripciones deben ser aprobadas</p>
                  </div>
                  <Switch
                    id="requiresApproval"
                    checked={formData.requiresApproval}
                    onCheckedChange={(checked) => handleInputChange("requiresApproval", checked)}
                  />
                </div>
              </MobileCardContent>
            </MobileCard>

            {/* Botones */}
            <div className="flex space-x-3 pt-4 border-t">
              <Button type="submit" className="flex-1">
                Crear Evento
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
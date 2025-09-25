import { useState } from "react";
import { X, Calendar, Clock, MapPin, Users, Star, DollarSign, Wifi, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface EventDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  isRegistered?: boolean;
  onToggleRegistration?: () => void;
}

export default function EventDetailDialog({
  isOpen,
  onClose,
  event,
  isRegistered = false,
  onToggleRegistration
}: EventDetailDialogProps) {
  const { toast } = useToast();

  const getEventDetails = (title: string) => {
    switch (title) {
      case "Yoga al Amanecer":
        return {
          fullDescription: "Únete a nosotros para una sesión mágica de yoga mientras sale el sol. Esta práctica matutina te ayudará a conectar con tu cuerpo y mente, estableciendo una intención positiva para todo el día. Incluye meditación guiada y técnicas de respiración.",
          instructor: "Ana Sofía Rodríguez",
          instructorBio: "Instructora certificada con 8 años de experiencia en Hatha y Vinyasa Yoga",
          included: ["Mat de yoga", "Agua aromática", "Snack saludable", "Certificado de participación"],
          whatToBring: ["Ropa cómoda", "Toalla pequeña", "Botella de agua"],
          cancellationPolicy: "Cancelación gratuita hasta 24 horas antes del evento",
          difficulty: "Principiante-Intermedio",
          maxCapacity: 25,
          currentAttendees: 18
        };
      case "Clase de Spinning":
        return {
          fullDescription: "Pedalea al ritmo de la música más energizante en esta clase de spinning de alta intensidad. Perfecta para quemar calorías, mejorar resistencia cardiovascular y tonificar piernas. Los instructores te guiarán a través de diferentes terrenos virtuales.",
          instructor: "Carlos Mendoza",
          instructorBio: "Instructor certificado de spinning con especialización en entrenamiento de resistencia",
          included: ["Bicicleta estática", "Toalla refrescante", "Bebida isotónica"],
          whatToBring: ["Ropa deportiva", "Zapatillas deportivas", "Botella de agua grande"],
          cancellationPolicy: "Cancelación gratuita hasta 2 horas antes",
          difficulty: "Intermedio-Avanzado",
          maxCapacity: 20,
          currentAttendees: 15
        };
      case "Entrenamiento Funcional":
        return {
          fullDescription: "Sesión de entrenamiento que combina ejercicios de fuerza, resistencia y movilidad usando el peso corporal y equipamiento funcional. Diseñado para mejorar el rendimiento en actividades cotidianas y deportes.",
          instructor: "María José Vargas",
          instructorBio: "Entrenadora personal certificada en entrenamiento funcional y CrossFit",
          included: ["Equipamiento completo", "Evaluación inicial", "Plan personalizado"],
          whatToBring: ["Ropa deportiva", "Zapatillas de entrenamiento", "Toalla"],
          cancellationPolicy: "Cancelación con 4 horas de anticipación",
          difficulty: "Todos los niveles",
          maxCapacity: 15,
          currentAttendees: 12
        };
      default:
        return {
          fullDescription: "Evento de fitness diseñado para mejorar tu bienestar físico y mental.",
          instructor: "Instructor Certificado",
          instructorBio: "Profesional con experiencia en fitness y bienestar",
          included: ["Equipamiento básico", "Hidratación"],
          whatToBring: ["Ropa deportiva", "Actitud positiva"],
          cancellationPolicy: "Consultar políticas de cancelación",
          difficulty: "Todos los niveles",
          maxCapacity: 20,
          currentAttendees: 10
        };
    }
  };

  const details = getEventDetails(event.title);

  const handleRegistration = () => {
    if (onToggleRegistration) {
      onToggleRegistration();
    }
    toast({
      title: isRegistered ? "Inscripción cancelada" : "¡Inscrito exitosamente!",
      description: isRegistered ? 
        "Tu inscripción ha sido cancelada" : 
        "Te esperamos en el evento. Revisa tu correo para más detalles",
    });
  };

  const availableSpots = details.maxCapacity - details.currentAttendees;
  const occupancyPercentage = (details.currentAttendees / details.maxCapacity) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>{event.title}</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6 p-1">
            {/* Información principal */}
            <MobileCard variant="elevated">
              <MobileCardHeader>
                <MobileCardTitle>Detalles del Evento</MobileCardTitle>
              </MobileCardHeader>
              <MobileCardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Fecha</p>
                        <p className="text-sm font-medium">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Hora</p>
                        <p className="text-sm font-medium">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Ubicación</p>
                        <p className="text-sm font-medium">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Precio</p>
                        <p className="text-sm font-medium">{event.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {event.type === "Presencial" ? <MapPin className="h-3 w-3 mr-1" /> : <Wifi className="h-3 w-3 mr-1" />}
                      {event.type}
                    </Badge>
                    <Badge variant="secondary">{details.difficulty}</Badge>
                    <Badge variant={event.category === "Yoga" ? "default" : event.category === "Cardio" ? "secondary" : "outline"}>
                      {event.category}
                    </Badge>
                  </div>
                </div>
              </MobileCardContent>
            </MobileCard>

            {/* Descripción completa */}
            <MobileCard variant="elevated">
              <MobileCardHeader>
                <MobileCardTitle>Descripción</MobileCardTitle>
              </MobileCardHeader>
              <MobileCardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {details.fullDescription}
                </p>
              </MobileCardContent>
            </MobileCard>

            {/* Instructor */}
            <MobileCard variant="elevated">
              <MobileCardHeader>
                <MobileCardTitle>Instructor</MobileCardTitle>
              </MobileCardHeader>
              <MobileCardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-sm">{details.instructor}</p>
                  <p className="text-sm text-muted-foreground">{details.instructorBio}</p>
                </div>
              </MobileCardContent>
            </MobileCard>

            {/* Disponibilidad */}
            <MobileCard variant="elevated">
              <MobileCardHeader>
                <MobileCardTitle className="flex items-center justify-between">
                  <span>Disponibilidad</span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">{details.currentAttendees}/{details.maxCapacity}</span>
                  </div>
                </MobileCardTitle>
              </MobileCardHeader>
              <MobileCardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Ocupación actual</span>
                      <span className="font-medium">{occupancyPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${occupancyPercentage}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {availableSpots > 0 ? 
                      `${availableSpots} cupo${availableSpots > 1 ? 's' : ''} disponible${availableSpots > 1 ? 's' : ''}` : 
                      "Evento lleno - Lista de espera disponible"
                    }
                  </p>
                </div>
              </MobileCardContent>
            </MobileCard>

            {/* Incluye y qué traer */}
            <div className="grid md:grid-cols-2 gap-4">
              <MobileCard variant="elevated">
                <MobileCardHeader>
                  <MobileCardTitle className="text-sm">Incluye</MobileCardTitle>
                </MobileCardHeader>
                <MobileCardContent>
                  <ul className="space-y-1">
                    {details.included.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </MobileCardContent>
              </MobileCard>

              <MobileCard variant="elevated">
                <MobileCardHeader>
                  <MobileCardTitle className="text-sm">Qué traer</MobileCardTitle>
                </MobileCardHeader>
                <MobileCardContent>
                  <ul className="space-y-1">
                    {details.whatToBring.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </MobileCardContent>
              </MobileCard>
            </div>

            {/* Política de cancelación */}
            <MobileCard variant="elevated">
              <MobileCardHeader>
                <MobileCardTitle className="text-sm">Política de Cancelación</MobileCardTitle>
              </MobileCardHeader>
              <MobileCardContent>
                <p className="text-sm text-muted-foreground">{details.cancellationPolicy}</p>
              </MobileCardContent>
            </MobileCard>

            {/* Acciones */}
            <div className="flex space-x-3 pt-4 border-t">
              <Button 
                onClick={handleRegistration}
                className={`flex-1 ${isRegistered ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary'}`}
                disabled={!isRegistered && availableSpots <= 0}
              >
                {isRegistered ? "Cancelar Inscripción" : 
                 availableSpots > 0 ? "Inscribirse" : "Unirse a Lista de Espera"}
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
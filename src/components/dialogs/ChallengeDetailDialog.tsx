import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Target, Users, Clock, Flame, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChallengeDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: {
    id: number;
    title: string;
    description: string;
    progress: number;
    daysCompleted?: number;
    totalDays?: number;
    streak?: number;
  };
}

export function ChallengeDetailDialog({ isOpen, onClose, challenge }: ChallengeDetailDialogProps) {
  const getChallengeDetails = (title: string) => {
    switch (title) {
      case "Rutina Matutina":
        return {
          icon: "🌅",
          startDate: "25 de Noviembre, 2024",
          schedule: [
            { day: "Lunes", completed: true, activity: "Cardio 30min", time: "07:00" },
            { day: "Martes", completed: true, activity: "Fuerza 45min", time: "07:15" },
            { day: "Miércoles", completed: true, activity: "Yoga 30min", time: "06:45" },
            { day: "Jueves", completed: true, activity: "HIIT 25min", time: "07:00" },
            { day: "Viernes", completed: true, activity: "Cardio 35min", time: "07:10" },
            { day: "Sábado", completed: false, activity: "Crossfit 40min", time: "08:00" },
            { day: "Domingo", completed: false, activity: "Recuperación activa", time: "09:00" }
          ],
          weeklyStats: [
            { label: "Días completados", value: "16/21", icon: Calendar },
            { label: "Tiempo total", value: "8h 45m", icon: Clock },
            { label: "Racha actual", value: "5 días", icon: Flame },
            { label: "Calorías quemadas", value: "2,850", icon: TrendingUp }
          ],
          milestones: [
            { week: 1, completed: true, reward: "Badge Madrugador" },
            { week: 2, completed: true, reward: "50 puntos XP" },
            { week: 3, completed: false, reward: "Medalla Consistencia" }
          ]
        };
      case "Hidratación Diaria":
        return {
          icon: "💧",
          startDate: "15 de Noviembre, 2024",
          schedule: [
            { day: "06:00", completed: true, activity: "500ml agua", time: "Al despertar" },
            { day: "09:00", completed: true, activity: "300ml agua", time: "Desayuno" },
            { day: "12:00", completed: true, activity: "400ml agua", time: "Almuerzo" },
            { day: "15:00", completed: false, activity: "300ml agua", time: "Merienda" },
            { day: "18:00", completed: false, activity: "500ml agua", time: "Cena" },
            { day: "21:00", completed: false, activity: "200ml agua", time: "Antes dormir" }
          ],
          weeklyStats: [
            { label: "Días completados", value: "18/30", icon: Calendar },
            { label: "Litros tomados", value: "45.6L", icon: Target },
            { label: "Racha actual", value: "3 días", icon: Flame },
            { label: "Promedio diario", value: "2.1L", icon: TrendingUp }
          ],
          milestones: [
            { week: 1, completed: true, reward: "Badge Hidratación" },
            { week: 2, completed: true, reward: "Botella personalizada" },
            { week: 3, completed: true, reward: "75 puntos XP" },
            { week: 4, completed: false, reward: "Medalla Bienestar" }
          ]
        };
      default:
        return {
          icon: "🎯",
          startDate: "Hoy",
          schedule: [],
          weeklyStats: [],
          milestones: []
        };
    }
  };

  const details = getChallengeDetails(challenge.title);
  const completedDays = challenge.daysCompleted || 0;
  const totalDays = challenge.totalDays || 21;
  const progressPercent = Math.round((completedDays / totalDays) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-2xl">{details.icon}</span>
            <span>{challenge.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Progreso general */}
          <MobileCard variant="success">
            <MobileCardContent className="space-y-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{completedDays}/{totalDays}</p>
                <p className="text-sm text-muted-foreground">días completados</p>
              </div>
              <Progress value={progressPercent} className="h-3" />
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <p className="font-semibold">{progressPercent}%</p>
                  <p className="text-muted-foreground">Progreso</p>
                </div>
                <div>
                  <p className="font-semibold text-warning">{challenge.streak || 0}</p>
                  <p className="text-muted-foreground">Racha</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">{totalDays - completedDays}</p>
                  <p className="text-muted-foreground">Restantes</p>
                </div>
              </div>
            </MobileCardContent>
          </MobileCard>

          {/* Estadísticas semanales */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>Estadísticas</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {details.weeklyStats.map((stat, index) => (
                <MobileCard key={index} variant="elevated">
                  <MobileCardContent className="text-center space-y-1">
                    <stat.icon className="h-5 w-5 mx-auto text-primary" />
                    <p className="font-bold text-sm">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </MobileCardContent>
                </MobileCard>
              ))}
            </div>
          </div>

          {/* Cronograma semanal */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Esta Semana</span>
            </h3>
            <div className="space-y-2">
              {details.schedule.map((item, index) => (
                <MobileCard key={index}>
                  <MobileCardContent className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        item.completed ? 'bg-success' : 'bg-muted'
                      }`}>
                        {item.completed && <span className="text-white text-xs">✓</span>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.day}</p>
                      <p className="text-xs text-muted-foreground">{item.activity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </MobileCardContent>
                </MobileCard>
              ))}
            </div>
          </div>

          {/* Hitos y recompensas */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center space-x-1">
              <Award className="h-4 w-4" />
              <span>Recompensas</span>
            </h3>
            <div className="space-y-2">
              {details.milestones.map((milestone, index) => (
                <MobileCard key={index} variant={milestone.completed ? "success" : "elevated"}>
                  <MobileCardContent className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        milestone.completed ? 'bg-success' : 'bg-muted'
                      }`}>
                        {milestone.completed ? (
                          <span className="text-white text-xs">✓</span>
                        ) : (
                          <span className="text-xs">{milestone.week}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">Semana {milestone.week}</p>
                        <p className="text-xs text-muted-foreground">{milestone.reward}</p>
                      </div>
                    </div>
                    {milestone.completed && (
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        Obtenido
                      </Badge>
                    )}
                  </MobileCardContent>
                </MobileCard>
              ))}
            </div>
          </div>

          {/* Información del desafío */}
          <div>
            <h3 className="font-semibold mb-2">Información</h3>
            <MobileCard variant="elevated">
              <MobileCardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fecha de inicio:</span>
                  <span className="font-medium">{details.startDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Duración:</span>
                  <span className="font-medium">{totalDays} días</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Dificultad:</span>
                  <Badge variant="outline" className="text-warning">Intermedio</Badge>
                </div>
              </MobileCardContent>
            </MobileCard>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cerrar
            </Button>
            <Button className="flex-1 bg-primary">
              Marcar Hoy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
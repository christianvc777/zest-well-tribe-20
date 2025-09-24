import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Calendar, Target, Trophy, TrendingUp } from "lucide-react";

interface AchievementDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: {
    title: string;
    description: string;
    date: string;
    type: string;
  };
}

export function AchievementDetailDialog({ isOpen, onClose, achievement }: AchievementDetailDialogProps) {
  const getAchievementDetails = (title: string) => {
    switch (title) {
      case "Primera Semana Completa":
        return {
          icon: "🎉",
          color: "text-success",
          completedDate: "15 de Diciembre, 2024",
          requirements: [
            { task: "Entrenar 7 días consecutivos", completed: true },
            { task: "Mínimo 30 min por sesión", completed: true },
            { task: "Registrar actividades", completed: true }
          ],
          progress: 100,
          stats: [
            { label: "Días consecutivos", value: "7", icon: Calendar },
            { label: "Tiempo total", value: "4h 20m", icon: Target },
            { label: "Calorías quemadas", value: "1,240", icon: TrendingUp },
          ],
          rewards: [
            "Medalla de Consistencia",
            "50 puntos de experiencia",
            "Badge especial en perfil"
          ],
          nextLevel: "Desafío 2 Semanas Activas"
        };
      case "Meta de Pasos":
        return {
          icon: "🚶‍♀️",
          color: "text-primary",
          completedDate: "13 de Diciembre, 2024", 
          requirements: [
            { task: "Alcanzar 10,000 pasos", completed: true },
            { task: "En un solo día", completed: true },
            { task: "Sin interrupciones", completed: true }
          ],
          progress: 100,
          stats: [
            { label: "Pasos totales", value: "10,247", icon: Target },
            { label: "Distancia", value: "8.2 km", icon: TrendingUp },
            { label: "Tiempo activo", value: "2h 15m", icon: Calendar },
          ],
          rewards: [
            "Insignia de Caminante",
            "25 puntos de experiencia", 
            "Descuento 10% en tienda"
          ],
          nextLevel: "Meta 15K Pasos Diarios"
        };
      case "Nuevo PR":
        return {
          icon: "🏋️‍♀️",
          color: "text-accent",
          completedDate: "11 de Diciembre, 2024",
          requirements: [
            { task: "Superar record anterior", completed: true },
            { task: "Técnica correcta validada", completed: true },
            { task: "Testigo presente", completed: true }
          ],
          progress: 100,
          stats: [
            { label: "Peso levantado", value: "65 kg", icon: Target },
            { label: "Mejora", value: "+5 kg", icon: TrendingUp },
            { label: "Repeticiones", value: "8 reps", icon: Calendar },
          ],
          rewards: [
            "Trofeo Personal Record",
            "75 puntos de experiencia",
            "Reconocimiento público"
          ],
          nextLevel: "PR en Peso Muerto"
        };
      default:
        return {
          icon: "🏆",
          color: "text-warning",
          completedDate: "Hoy",
          requirements: [],
          progress: 100,
          stats: [],
          rewards: [],
          nextLevel: ""
        };
    }
  };

  const details = getAchievementDetails(achievement.title);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-2xl">{details.icon}</span>
            <span>{achievement.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Información del logro */}
          <MobileCard variant="success">
            <MobileCardContent className="text-center space-y-3">
              <div>
                <Badge className="bg-success text-success-foreground mb-2">
                  ✓ Completado
                </Badge>
                <p className="font-semibold">{achievement.description}</p>
                <p className="text-sm text-muted-foreground">{details.completedDate}</p>
              </div>
              <Progress value={details.progress} className="h-2" />
            </MobileCardContent>
          </MobileCard>

          {/* Requisitos cumplidos */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span>Requisitos</span>
            </h3>
            <div className="space-y-2">
              {details.requirements.map((req, index) => (
                <MobileCard key={index}>
                  <MobileCardContent className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <p className="text-sm">{req.task}</p>
                  </MobileCardContent>
                </MobileCard>
              ))}
            </div>
          </div>

          {/* Estadísticas del logro */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>Estadísticas</span>
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {details.stats.map((stat, index) => (
                <MobileCard key={index} variant="elevated">
                  <MobileCardContent className="flex items-center space-x-3">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{stat.label}</p>
                    </div>
                    <p className="font-bold text-primary">{stat.value}</p>
                  </MobileCardContent>
                </MobileCard>
              ))}
            </div>
          </div>

          {/* Recompensas obtenidas */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center space-x-1">
              <Trophy className="h-4 w-4" />
              <span>Recompensas</span>
            </h3>
            <div className="space-y-2">
              {details.rewards.map((reward, index) => (
                <MobileCard key={index} variant="elevated">
                  <MobileCardContent className="flex items-center space-x-3">
                    <Star className="h-4 w-4 text-warning" />
                    <p className="text-sm">{reward}</p>
                  </MobileCardContent>
                </MobileCard>
              ))}
            </div>
          </div>

          {/* Próximo desafío */}
          {details.nextLevel && (
            <div>
              <h3 className="font-semibold mb-2">Siguiente Nivel</h3>
              <MobileCard variant="elevated">
                <MobileCardContent className="text-center">
                  <p className="text-sm font-medium text-primary">{details.nextLevel}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ¡Sigue entrenando para desbloquear!
                  </p>
                </MobileCardContent>
              </MobileCard>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
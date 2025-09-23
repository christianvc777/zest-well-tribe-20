import { ArrowLeft, Users, Zap, Trophy, Target, Calendar, MapPin, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export default function CommunityActive() {
  const navigate = useNavigate();

  const activeMembers = [
    {
      id: 1,
      name: "Ana Rodríguez",
      avatar: "",
      status: "Corriendo 5K",
      location: "Parque Central",
      time: "Hace 5 min",
      activity: "Cardio",
      level: "Intermedio"
    },
    {
      id: 2,
      name: "Carlos Mendoza", 
      avatar: "",
      status: "Rutina de Fuerza",
      location: "Gym FitZone",
      time: "Hace 12 min",
      activity: "Fuerza",
      level: "Avanzado"
    },
    {
      id: 3,
      name: "María González",
      avatar: "",
      status: "Yoga Matutino",
      location: "En Casa",
      time: "Hace 18 min", 
      activity: "Yoga",
      level: "Principiante"
    },
    {
      id: 4,
      name: "Luis Torres",
      avatar: "",
      status: "Crossfit WOD",
      location: "CrossFit Box",
      time: "Hace 25 min",
      activity: "CrossFit", 
      level: "Avanzado"
    }
  ];

  const groupActivities = [
    {
      id: 1,
      title: "Clase de Spinning",
      participants: 23,
      maxParticipants: 30,
      instructor: "Coach Elena",
      time: "18:00 - 19:00",
      difficulty: "Intermedio",
      location: "Gimnasio Central"
    },
    {
      id: 2,
      title: "Entrenamiento HIIT",
      participants: 15,
      maxParticipants: 20,
      instructor: "Coach Miguel",
      time: "19:30 - 20:30", 
      difficulty: "Avanzado",
      location: "Estudio Fitness"
    },
    {
      id: 3,
      title: "Yoga Relajante",
      participants: 18,
      maxParticipants: 25,
      instructor: "Coach Sandra",
      time: "20:00 - 21:00",
      difficulty: "Principiante",
      location: "Sala Zen"
    }
  ];

  const challengesActive = [
    { title: "30 Días de Cardio", participants: 1547, completion: 73 },
    { title: "Desafío 10K Pasos", participants: 3241, completion: 85 },
    { title: "Rutina Matutina", participants: 2156, completion: 67 },
    { title: "Fuerza Total", participants: 892, completion: 58 }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Principiante": return "text-success";
      case "Intermedio": return "text-warning";
      case "Avanzado": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case "Cardio": return "❤️";
      case "Fuerza": return "💪";
      case "Yoga": return "🧘‍♀️";
      case "CrossFit": return "🏋️‍♂️";
      default: return "🏃‍♂️";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-white sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Comunidad Activa</h1>
              <p className="text-primary-glow text-sm">¡Todos están entrenando!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Estadísticas en tiempo real */}
        <MobileCard variant="elevated">
          <MobileCardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-success animate-pulse" />
                </div>
                <p className="text-2xl font-bold text-success">1,247</p>
                <p className="text-xs text-muted-foreground">Entrenando ahora</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-6 w-6 text-warning" />
                </div>
                <p className="text-2xl font-bold text-warning">532</p>
                <p className="text-xs text-muted-foreground">Retos completados hoy</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center mt-4 pt-4 border-t border-border">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <p className="text-2xl font-bold text-accent">89</p>
                <p className="text-xs text-muted-foreground">Eventos próximos</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-primary">15.2K</p>
                <p className="text-xs text-muted-foreground">Interacciones hoy</p>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Miembros activos */}
        <section>
          <h2 className="text-xl font-bold mb-4">Miembros Entrenando Ahora</h2>
          <div className="space-y-3">
            {activeMembers.map((member) => (
              <MobileCard key={member.id} variant="elevated">
                <MobileCardContent className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background animate-pulse"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-sm truncate">{member.name}</h3>
                      <Badge variant="outline" className={getDifficultyColor(member.level)}>
                        {member.level}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-lg">{getActivityIcon(member.activity)}</span>
                      <p className="text-sm font-medium">{member.status}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{member.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{member.time}</span>
                      </div>
                    </div>
                  </div>
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>
        </section>

        {/* Actividades grupales */}
        <section>
          <h2 className="text-xl font-bold mb-4">Clases en Vivo</h2>
          <div className="space-y-3">
            {groupActivities.map((activity) => (
              <MobileCard key={activity.id} variant="success">
                <MobileCardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <MobileCardTitle className="text-base">{activity.title}</MobileCardTitle>
                      <p className="text-sm text-muted-foreground">Con {activity.instructor}</p>
                    </div>
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      En vivo
                    </Badge>
                  </div>
                </MobileCardHeader>
                <MobileCardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{activity.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{activity.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{activity.participants}/{activity.maxParticipants} participantes</span>
                        </div>
                        <Badge variant="outline" className={getDifficultyColor(activity.difficulty)}>
                          {activity.difficulty}
                        </Badge>
                      </div>
                      <Button size="sm" className="bg-success hover:bg-success/90">
                        Unirse
                      </Button>
                    </div>
                  </div>
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>
        </section>

        {/* Retos activos */}
        <section>
          <h2 className="text-xl font-bold mb-4">Retos Más Populares</h2>
          <div className="grid grid-cols-1 gap-3">
            {challengesActive.map((challenge, index) => (
              <MobileCard key={index} variant="elevated">
                <MobileCardContent className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{challenge.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {challenge.participants.toLocaleString()} participantes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{challenge.completion}%</p>
                    <p className="text-xs text-muted-foreground">Completado</p>
                  </div>
                </MobileCardContent>
              </MobileCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
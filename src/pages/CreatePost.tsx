import { useState } from "react";
import { ArrowLeft, Camera, Image as ImageIcon, MapPin, Users, Tag, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function CreatePost() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [postContent, setPostContent] = useState("");
  const [postType, setPostType] = useState<"achievement" | "workout" | "promotion" | "tip" | "sale">("workout");
  const [isForSale, setIsForSale] = useState(false);
  const [salePrice, setSalePrice] = useState("");
  const [productName, setProductName] = useState("");

  const postTypes = [
    { type: "achievement", label: "Logro", emoji: "🏆", color: "text-success" },
    { type: "workout", label: "Ejercicio", emoji: "💪", color: "text-primary" },
    { type: "promotion", label: "Promoción", emoji: "🔥", color: "text-warning" },
    { type: "tip", label: "Consejo", emoji: "💡", color: "text-accent" },
    { type: "sale", label: "Venta", emoji: "🛒", color: "text-destructive" }
  ];

  const handleSubmit = () => {
    if (!postContent.trim()) {
      toast({
        title: "Error",
        description: "Por favor escribe el contenido de tu publicación",
        variant: "destructive"
      });
      return;
    }

    if (isForSale && (!productName.trim() || !salePrice.trim())) {
      toast({
        title: "Error", 
        description: "Por favor completa la información del producto",
        variant: "destructive"
      });
      return;
    }

    // Simular creación del post
    toast({
      title: "¡Publicación creada!",
      description: "Tu post se ha compartido con la comunidad",
    });

    navigate("/feed");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-white sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/feed")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Nueva Publicación</h1>
              <p className="text-primary-glow text-sm">Comparte con la comunidad</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleSubmit}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Send className="h-4 w-4 mr-1" />
            Publicar
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Perfil del usuario */}
        <MobileCard variant="elevated">
          <MobileCardContent className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" alt="María" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                M
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">María González</h3>
              <p className="text-sm text-muted-foreground">@maria_fitness</p>
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Selector de tipo de post */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Tipo de Publicación</h2>
          <div className="grid grid-cols-3 gap-2">
            {postTypes.map((type) => (
              <Button
                key={type.type}
                variant={postType === type.type ? "default" : "outline"}
                size="sm"
                className={`flex flex-col items-center space-y-1 h-auto py-3 ${
                  postType === type.type ? "bg-primary shadow-soft" : ""
                }`}
                onClick={() => {
                  setPostType(type.type as any);
                  setIsForSale(type.type === "sale");
                }}
              >
                <span className="text-lg">{type.emoji}</span>
                <span className="text-xs">{type.label}</span>
              </Button>
            ))}
          </div>
        </section>

        {/* Información del producto (solo para ventas) */}
        {isForSale && (
          <MobileCard variant="elevated">
            <MobileCardHeader>
              <MobileCardTitle className="text-base">Información del Producto</MobileCardTitle>
            </MobileCardHeader>
            <MobileCardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre del producto</label>
                <Input
                  placeholder="Ej. Proteína Whey 2kg"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Precio</label>
                <Input
                  placeholder="$50.000"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="mt-1"
                />
              </div>
            </MobileCardContent>
          </MobileCard>
        )}

        {/* Contenido del post */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Contenido</h2>
          <MobileCard variant="elevated">
            <MobileCardContent>
              <Textarea
                placeholder={
                  isForSale 
                    ? "Describe tu producto, estado, razón de venta, etc."
                    : postType === "achievement"
                    ? "¡Comparte tu logro con la comunidad!"
                    : postType === "tip"
                    ? "Comparte un consejo útil..."
                    : "¿Qué quieres compartir hoy?"
                }
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={4}
                className="resize-none border-0 focus:ring-0 p-0"
              />
            </MobileCardContent>
          </MobileCard>
        </section>

        {/* Opciones de multimedia */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Agregar Contenido</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="flex items-center justify-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Foto</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center justify-center space-x-2">
              <ImageIcon className="h-4 w-4" />
              <span>Galería</span>
            </Button>
          </div>
        </section>

        {/* Vista previa */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Vista Previa</h2>
          <MobileCard variant="elevated">
            <MobileCardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt="María" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      M
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-sm">María González</h3>
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5">✓</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-muted-foreground">@maria_fitness</p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">Ahora</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg" title={postType}>
                    {postTypes.find(t => t.type === postType)?.emoji}
                  </span>
                </div>
              </div>
            </MobileCardHeader>

            <MobileCardContent>
              {isForSale && productName && (
                <div className="mb-3 p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{productName}</h4>
                      <p className="text-sm text-muted-foreground">En venta</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-success">{salePrice}</p>
                      <Button size="sm" className="bg-success hover:bg-success/90">
                        Comprar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-sm leading-relaxed">
                {postContent || "Escribe algo para ver la vista previa..."}
              </p>

              {/* Placeholder para imagen */}
              <div className="mt-3 bg-muted rounded-lg h-48 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Imagen del post</p>
                </div>
              </div>
            </MobileCardContent>
          </MobileCard>
        </section>
      </div>
    </div>
  );
}
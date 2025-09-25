import { useState } from "react";
import { X, Heart, MessageCircle, Share2, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommentDialog } from "./CommentDialog";
import { PostMenuDialog } from "./PostMenuDialog";
import { useToast } from "@/hooks/use-toast";

interface PostDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  isLiked: boolean;
  onLike: () => void;
  comments: any[];
}

export default function PostDetailDialog({
  isOpen,
  onClose,
  post,
  isLiked,
  onLike,
  comments
}: PostDetailDialogProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const nextImage = () => {
    if (post.images && post.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % post.images.length);
    }
  };

  const prevImage = () => {
    if (post.images && post.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length);
    }
  };

  const handleShare = () => {
    toast({
      title: "Compartido",
      description: "Post compartido exitosamente",
    });
  };

  const handleComment = () => {
    if (newComment.trim()) {
      toast({
        title: "Comentario agregado",
        description: "Tu comentario se ha publicado",
      });
      setNewComment("");
    }
  };

  if (!post) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 flex">
          {/* Imagen/es del post */}
          <div className="flex-1 bg-black flex items-center justify-center relative">
            {post.images && post.images.length > 0 ? (
              <>
                <img 
                  src={post.images[currentImageIndex]} 
                  alt="Post" 
                  className="max-w-full max-h-full object-contain"
                />
                {post.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 p-2 rounded-full"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 p-2 rounded-full"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    {/* Indicadores de imagen */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {post.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center text-muted-foreground">
                Sin imagen
              </div>
            )}
          </div>

          {/* Panel lateral con información */}
          <div className="w-96 flex flex-col bg-background">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{post.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {post.timeAgo || post.timestamp}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowMenu(true)}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Contenido del post */}
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-sm">{post.content}</p>
                  {post.type && (
                    <Badge variant="secondary" className="mt-2">
                      {post.type}
                    </Badge>
                  )}
                </div>

                {/* Estadísticas */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{post.likes} me gusta</span>
                  <span>{comments.length} comentarios</span>
                </div>

                <Separator />

                {/* Comentarios */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Comentarios</h4>
                  {comments.slice(0, 3).map((comment, index) => (
                    <div key={index} className="flex space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {comment.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-xs">
                          <span className="font-semibold">{comment.user}</span>{" "}
                          {comment.text}
                        </p>
                        <p className="text-xs text-muted-foreground">{comment.timeAgo}</p>
                      </div>
                    </div>
                  ))}
                  {comments.length > 3 && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="p-0 h-auto text-xs"
                      onClick={() => setShowComments(true)}
                    >
                      Ver todos los comentarios ({comments.length})
                    </Button>
                  )}
                </div>
              </div>
            </ScrollArea>

            {/* Acciones */}
            <div className="border-t p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onLike}
                    className="p-0 h-auto text-muted-foreground hover:text-red-500"
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowComments(true)}
                    className="p-0 h-auto text-muted-foreground"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="p-0 h-auto text-muted-foreground"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Agregar comentario */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Agregar comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                  className="flex-1 text-sm"
                />
                <Button size="sm" onClick={handleComment}>
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CommentDialog
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        post={post}
      />

      <PostMenuDialog
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        post={post}
      />
    </>
  );
}
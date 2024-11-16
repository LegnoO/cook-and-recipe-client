// ** Components
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ** Icons
import { Clock, Users } from "lucide-react";

const RecipeCard = () => {
  return (
    <Card className="overflow-hidden">
      <img
        //  src={recipe.image}
        //  alt={recipe.title}
        className="cursor-pointer h-40 w-full object-cover"
        src={
          "https://pivoo.themepreview.xyz/home-three/wp-content/uploads/sites/4/2024/04/raspberry-2023404_1920.jpg"
        }
        alt={"recipe"}
      />
      <CardContent className="cursor-pointer p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">title</h3>
        </div>

        <div className="mt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> 4 phút
            </span>
            <span className="flex items-center gap-1">
              <Users className="ml-2 h-4 w-4" /> 4 người
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            Bánh mì giòn với thịt nướng thơm lừng và rau sống tươi mát...
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Badge variant="ghost">Khó</Badge>
      </CardFooter>
    </Card>
  );
};
export default RecipeCard;

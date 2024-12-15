// ** React Imports
import { useState, Fragment } from "react";

// ** Next Imports
import Image from "next/image";

// ** Components
import { Card, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const OwnRecipeCard = () => {
  const fake_data = [
    {
      name: "Vietnamese Pho",
      description:
        "A delicious and aromatic Vietnamese soup made with beef, fresh herbs, and rice noodles. Perfect for any occasion.",
      ingredients: [
        { name: "Beef bones", quantity: 500, measurement: "grams" },
        { name: "Beef brisket", quantity: 200, measurement: "grams" },
        // ... other ingredients
      ],
      instructionSections: [
        {
          title: "Prepare the Broth",
          instructions: [
            {
              step: 1,
              description: "Rinse beef bones and brisket under cold water.",
            },
            // ... other instructions
          ],
        },
        // ... other sections
      ],
      timeToCook: 180,
      difficulty: "Medium",
      serves: 4,
      category: "Soup",
      isPublic: false,
    },
  ];
  const [recipes, setRecipes] = useState(fake_data);

  const togglePublish = (index: number) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index].isPublic = !updatedRecipes[index].isPublic;
    setRecipes(updatedRecipes);
  };

  return (
    <Fragment>
      {recipes.map((recipe, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="relative p-0">
            <div className="relative h-[240px] w-full">
              <Image
                className="object-cover"
                fill
                src={
                  "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/pasta-with-salmon-P784PLF.jpg"
                }
                alt={"card"}
              />
            </div>
          </CardHeader>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <p className="mb-1 text-sm font-medium text-primary">Beverages</p>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-medium">4.5</span>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-semibold">{recipe.name}</h3>
            <p className="mb-4 line-clamp-2 text-sm text-gray-600">
              {recipe.description}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>🕒 {recipe.timeToCook} mins</span>
              <span>👥 Serves {recipe.serves}</span>
              <span>📊 {recipe.difficulty}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Button>View Recipe</Button>
              <div className="ml-4 flex items-center space-x-2">
                <Switch
                  id={`publish-${index}`}
                  checked={recipe.isPublic}
                  onCheckedChange={() => togglePublish(index)}
                />
                <Label htmlFor={`publish-${index}`}>
                  {recipe.isPublic ? "Public" : "Private"}
                </Label>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </Fragment>
  );
};

export default OwnRecipeCard;

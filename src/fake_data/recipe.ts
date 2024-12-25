export const recipe = {
  name: "Vietnamese Pho",
  description:
    "A delicious and aromatic Vietnamese soup made with beef, fresh herbs, and rice noodles. Perfect for any occasion.",
  ingredients: [
    { name: "Beef bones", quantity: 500, measurement: "grams" },
    { name: "Beef brisket", quantity: 200, measurement: "grams" },
    { name: "Rice noodles", quantity: 200, measurement: "grams" },
    { name: "Onion", quantity: 1, measurement: "piece" },
    { name: "Ginger", quantity: 1, measurement: "piece" },
    { name: "Star anise", quantity: 3, measurement: "pieces" },
    { name: "Cloves", quantity: 5, measurement: "pieces" },
    { name: "Cinnamon stick", quantity: 1, measurement: "piece" },
    { name: "Fish sauce", quantity: 2, measurement: "tablespoons" },
    { name: "Salt", quantity: 1, measurement: "teaspoon" },
    { name: "Green onions", quantity: 2, measurement: "pieces" },
    { name: "Cilantro", quantity: 1, measurement: "bunch" },
    { name: "Bean sprouts", quantity: 100, measurement: "grams" },
    { name: "Basil leaves", quantity: 1, measurement: "bunch" },
    { name: "Chili peppers", quantity: 2, measurement: "pieces" },
    { name: "Lime", quantity: 1, measurement: "piece" },
  ],
  instructionSections: [
    {
      title: "Prepare the Broth",
      instructions: [
        {
          step: 1,
          description: "Rinse beef bones and brisket under cold water.",
        },
        {
          step: 2,
          description:
            "Add beef bones and brisket to a large pot, cover with water, and bring to a boil.",
        },
        {
          step: 3,
          description:
            "Skim off any impurities, then add onion, ginger, star anise, cloves, and cinnamon stick.",
        },
        {
          step: 4,
          description: "Simmer for 2-3 hours to develop a rich broth flavor.",
        },
        { step: 5, description: "Add fish sauce and salt to taste." },
      ],
    },
    {
      title: "Prepare the Noodles and Garnishes",
      instructions: [
        {
          step: 1,
          description:
            "Soak rice noodles in warm water for 10-15 minutes, then drain.",
        },
        {
          step: 2,
          description:
            "Blanch noodles in boiling water for 30 seconds, then transfer to bowls.",
        },
        {
          step: 3,
          description:
            "Slice green onions and cilantro, set aside along with bean sprouts, basil leaves, chili peppers, and lime.",
        },
      ],
    },
    {
      title: "Assemble the Pho",
      instructions: [
        {
          step: 1,
          description: "Place a portion of noodles in each serving bowl.",
        },
        {
          step: 2,
          description:
            "Add slices of brisket, then pour hot broth over the ingredients.",
        },
        {
          step: 3,
          description:
            "Garnish with green onions, cilantro, bean sprouts, basil, chili peppers, and a wedge of lime.",
        },
      ],
    },
  ],
  timeToCook: 180,
  difficulty: "Medium",
  serves: 4,
  images: ["", "", "", ""],
  category: "Soup",
};

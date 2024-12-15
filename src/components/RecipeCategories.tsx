// ** Next Imports
import Image from "next/image";

export default function RecipeCategories() {
  const fake_data = [
    {
      name: "Beef",
      description: "",
      image:
        "https://thatix.progressionstudios.com/wp-content/uploads/elementor/thumbs/beef-steak-tomahawk-S3JHQLN-omrts5j8kcndyxcktp15s34fxqxhw3isn1lr4x0gbk.jpg",
    },
    {
      name: "Chicken",
      description: "",
      image:
        "https://thatix.progressionstudios.com/wp-content/uploads/elementor/thumbs/baked-chicken-breast-9C4F43W-omrrd1tn91eu3rvdg1lqq2eq8c90ltq8nx9y5u5sww.jpg",
    },
    {
      name: "Vegetarian",
      description: "",
      image:
        "https://thatix.progressionstudios.com/wp-content/uploads/elementor/thumbs/cooked-vegetables-according-to-chinese-recipe-PN2GKUB-omrff2jgxcsv5cfw86lk4kjvmzkfiaqk7pxv13p38g.jpg",
    },
    {
      name: "Desserts",
      description: "",
      image:
        "https://thatix.progressionstudios.com/wp-content/uploads/elementor/thumbs/pecan-pie-tart-in-baking-dish-traditional-festive-9WMXQ3Z-omrtq2c5dlsg64dt0sj08m3kex84sb89opewqs3y5c.jpg",
    },
    {
      name: "Appetizers",
      description: "",
      image:
        "https://thatix.progressionstudios.com/wp-content/uploads/elementor/thumbs/appetizer-bruschetta-with-tuna-and-tomatoes-LKA5ZYU-omrs5xf57sxyshxatiz4bs2j8hwz32ddausyxvcdr4.jpg",
    },
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container">
        <div className="flex flex-col gap-2">
          <h2 className="mb-12 text-center text-4xl font-bold tracking-wider lg:text-3xl">
            Recipe Categories
          </h2>
          <div className="grid-cols-5-res grid-cols-2 gap-16">
            {fake_data.map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <Image
                  src={data.image}
                  alt={data.name}
                  width={176}
                  height={176}
                  className="rounded-full shadow-light-circle transition-transform duration-400 hover:rotate-4"
                />
                <h3 className="mb-2 text-center text-lg font-bold">
                  {data.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

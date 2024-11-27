// ** Components
import { Logo } from "@/components/ui/icons";

const Footer = () => {
  return (
    <div className="bg-footer">
      <div className="container pb-8 pt-12">
        <div className="flex">
          <div className="w-2/5">
            <div className="w-[70%]">
              <div className="mb-4 flex items-center gap-1">
                <Logo size={40} className="text-foreground" />
                <span className="inline-block text-2xl font-medium text-foreground ">
                  Cook & Recipe
                </span>
              </div>
              <p className="text-start text-muted-foreground">
                Hearing. Of and the maybe her princesses her back pushed help
                you other or it’s of synthesizers.
              </p>
            </div>
          </div>
          <div className="w-1/5">
            <div className="">
              <h4 className="mb-4 text-2xl font-bold">Categories</h4>
              <ul className="flex flex-col gap-2">
                <li>Baked Goods</li>
                <li>Baked Goods</li>
                <li>Baked Goods</li>
                <li>Baked Goods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;

// ** Components
import { Logo } from "@/components/ui/Icons";
import { typography } from "@/components/Primitives";

// ** Styles
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className="flex">
          <div className="w-full max-w-[22.5%]">
            <div className="flex flex-col p-2.5">
              <div className="mb-5 flex items-center gap-3">
                <Logo size={50} className="text-foreground" />
                <span
                  className={typography({
                    className: "inline-block font-medium text-foreground",
                    display: "xs",
                  })}>
                  Cook & Recipe
                </span>
              </div>
              <div className="w-11/12">
                <p
                  className={typography({
                    className: "pl-4 text-start font-serif text-foreground",
                    text: "xl",
                  })}>
                  Hearing. Of and the maybe her princesses her back pushed help
                  you other or it’s of synthesizers.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[15%]">
            <div className="flex flex-col p-2.5">
              <h3
                className={typography({
                  className: "mb-5 font-medium text-foreground",
                  display: "xs",
                })}>
                Categories
              </h3>
              <ul className="flex flex-col gap-2 font-serif">
                <li>Baked Goods</li>
                <li>Baked Goods</li>
                <li>Baked Goods</li>
                <li>Baked Goods</li>
              </ul>
            </div>
          </div>
          <div className="dev h-[100px] w-full max-w-[35.5%]"></div>
          <div className="dev h-[100px] w-full max-w-[27%]"></div>
        </div>
      </div>
    </div>
  );
};
export default Footer;

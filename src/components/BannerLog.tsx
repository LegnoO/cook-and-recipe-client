import React from "react";

// ** Types
type Props = {
  url?: string;
  title: string;
};

const BannerLog = ({
  title = "title",
  url = "https://thatix.progressionstudios.com/wp-content/uploads/2020/03/page-title.jpg",
}: Props) => {
  return (
    <div
      className="h-[210px] bg-cover bg-center-top bg-no-repeat"
      style={{ background: `url(${url})` }}>
      <div className="container flex h-full items-center">
        <h1 className="font-semibold text-5xl text-white">{title}</h1>
      </div>
    </div>
  );
};
export default BannerLog;

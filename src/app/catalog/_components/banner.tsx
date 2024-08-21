"use client";

import Image from "next/image";
import Link from "next/link";
import { useIsClient } from "usehooks-ts";
import { Carousel } from "antd";

export const Banner = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return <div style={{ height: 157 }}></div>;
  }

  return (
    <Carousel>
      <Link href="/">
        <Image
          alt="banner"
          src="/2000_315_eway_v_katalog.png"
          width={1100}
          height={157}
          priority={false}
        />
      </Link>
      <Link href="/">
        <Image
          alt="banner"
          src="/group_1000003051.png"
          width={1100}
          height={157}
          priority={false}
        />
      </Link>
    </Carousel>
  );
};

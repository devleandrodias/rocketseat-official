import { Fragment } from "react";

import { Hero } from "./Hero";
import { CoffeeGrid } from "./CoffeeGrid";

export function Home() {
  return (
    <Fragment>
      <Hero />
      <CoffeeGrid />
    </Fragment>
  );
}

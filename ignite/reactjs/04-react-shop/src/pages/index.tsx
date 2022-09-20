import Stripe from "stripe";

import Head from "next/head";
import Link from "next/link";
import Image from "next/future/image";

import { GetStaticProps } from "next";
import { useKeenSlider } from "keen-slider/react";

import { stripe } from "../lib/stripe";
import { HomeContainer, Product } from "../styles/pages/home";

import "keen-slider/keen-slider.min.css";
import { Fragment } from "react";

interface HomeProps {
  products: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  });

  return (
    <Fragment>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(({ id, imageUrl, name, price }) => (
          <Link href={`/product/${id}`} key={id} prefetch={false}>
            <Product className="keen-slider__slide">
              <Image src={imageUrl} width={520} height={480} alt="" />
              <footer>
                <strong>{name}</strong>
                <span>{price}</span>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format((price.unit_amount as number) / 100),
    };
  });

  return {
    props: { products },
    revalidate: 60 * 60 * 2, // 2h
  };
};

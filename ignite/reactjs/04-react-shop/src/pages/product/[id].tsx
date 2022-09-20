import Axios from "axios";
import Stripe from "stripe";
import Head from "next/head";

import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import Image from "next/future/image";

import { stripe } from "../../lib/stripe";

import {
  ImageContainer,
  ProductDetails,
  ProductContainer,
} from "../../styles/pages/product";

type ProductProps = {
  product: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
    defaultPriceId: string;
  };
};

type CheckoutResponse = {
  checkoutUrl: string;
};

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  const [isCreatingSession, setCreatingSession] = useState(false);

  async function handleBuyProduct() {
    try {
      setCreatingSession(true);
      const response = await Axios.post<CheckoutResponse>("/api/checkout", {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setCreatingSession(false);

      alert("Falha ao redirecionar ao checkout!");
    }
  }

  if (isFallback) {
    return <p>Loading...</p>;
  } else {
    return (
      <Fragment>
        <Head>
          <title>{product.name} | Ignite Shop</title>
        </Head>
        <ProductContainer>
          <ImageContainer>
            <Image src={product.imageUrl} width={520} height={480} alt="" />
          </ImageContainer>
          <ProductDetails>
            <h1>{product.name}</h1>
            <span>{product.price}</span>
            <p>{product.description}</p>
            <button disabled={isCreatingSession} onClick={handleBuyProduct}>
              Comprar agora
            </button>
          </ProductDetails>
        </ProductContainer>
      </Fragment>
    );
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_MQU5z1AnfN1msr" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id as string;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        defaultPriceId: price.id,
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format((price.unit_amount as number) / 100),
      },
    },
    revalidate: 60 * 60 * 1, // 1h
  };
};

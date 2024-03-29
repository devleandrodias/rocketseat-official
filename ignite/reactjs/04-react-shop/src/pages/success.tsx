import Stripe from "stripe";

import Link from "next/link";
import Head from "next/head";
import Image from "next/future/image";

import { Fragment } from "react";
import { GetServerSideProps } from "next";

import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

type SuccessProps = {
  costumerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
};

export default function Success({ costumerName, product }: SuccessProps) {
  return (
    <Fragment>
      <Head>
        <title>{product.name} | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua{" "}
          <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catalogo</Link>
      </SuccessContainer>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const costumerName = session?.customer_details?.name as string;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      costumerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};

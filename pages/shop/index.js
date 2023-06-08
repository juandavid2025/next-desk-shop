import { getSession } from "next-auth/react";
import DeskShop from "@/components/home/shop/desk-shop";
import { connectToDatabase } from "@/helper/lib/db";

function ShopPage(props) {
  return <DeskShop desks={props.desks} />;
}

export default ShopPage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const client = await connectToDatabase();
  const deskCollection = client.db().collection("desks");
  const desk = await deskCollection.findOne({ name: "Mapple special" });
  desk._id = desk._id.toString();

  return {
    props: {
      desks: [desk],
      session,
    },
  };
}

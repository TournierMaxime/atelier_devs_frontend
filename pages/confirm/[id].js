//Imports
import ConfirmAccount from "../../components/Profil/ConfirmAccount";

//Export data to ConfirmAccount
export default function ConfirmAccountId({ data, id }) {
  return <ConfirmAccount data={data} id={id} />;
}

//Retrieve data account id
export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch(`${process.env.URL_BACKEND}/api/auth/confirm/${id}}`);
  const data = await res.json();
  return {
    props: { data, id },
  };
}

//Imports
import Profil from "../components/Profil/Profil";

//Export data to Profil
export default function ProfilId({ id }) {
  return <Profil id={id} />;
}

//Retrieve data users id
export async function getServerSideProps(context) {
  const id = context.params.id;
  const response = await fetch(`${process.env.URL_BACKEND}/api/users/${id}`);
  return {
    props: { id },
  };
}

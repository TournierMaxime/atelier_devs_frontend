import Profil from "../components/Profil/Profil";
export default function ProfilId({ id }) {
  return <Profil id={id} />;
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const response = await fetch(`${process.env.URL_BACKEND}/api/users/${id}`);
  return {
    props: { id },
  };
}

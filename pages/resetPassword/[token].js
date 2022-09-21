//Imports
import ResetPasswordAccount from "../../components/Profil/ResetPasswordAccount";

//Export data to ResetPasswordAccount
export default function ResetPasswordToken({ id }) {
  return <ResetPasswordAccount id={id} />;
}

//retrieve data to resetPassword id
export async function getServerSideProps(context) {
  const id = context.params.token;
  const res = await fetch(
    `${process.env.URL_BACKEND}/api/auth/resetPassword/${id}}`
  );
  const message = await res.json();
  return {
    props: { id },
  };
}

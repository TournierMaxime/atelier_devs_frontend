import ResetPasswordAccount from "../../components/Profil/ResetPasswordAccount";

export default function ResetPasswordToken({ id, message }) {
  return <ResetPasswordAccount message={message} id={id} />;
}

export async function getServerSideProps(context) {
  const id = context.params.token;
  const res = await fetch(
    `${process.env.URL_BACKEND}/api/auth/resetPassword/${id}}`
  );
  const message = await res.json();
  return {
    props: { message, id },
  };
}

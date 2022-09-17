import GetOne from "../../components/Info/GetOne";
export default function Id({ data, id }) {
  return <GetOne data={data} id={id} />;
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch(`${process.env.URL_BACKEND}/api/posts/${id}}`);
  const data = await res.json();
  return {
    props: { data, id },
  };
}

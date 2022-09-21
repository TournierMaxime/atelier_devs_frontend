//Imports
import GetOne from "../../components/Info/GetOne";

//Export data to GetOne
export default function Id({ data, id }) {
  return <GetOne data={data} id={id} />;
}

//Retrieve data post id
export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch(`${process.env.URL_BACKEND}/api/posts/${id}}`);
  const data = await res.json();
  return {
    props: { data, id },
  };
}

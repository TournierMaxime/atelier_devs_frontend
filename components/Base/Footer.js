export default function Footer() {
  return (
    <div className="surface-section px-4 py-6 md:px-6 lg:px-8 text-center">
      <div className="font-medium text-900 mt-4 mb-3">
        &copy; 2022 Atelier des Devs, Inc
      </div>

      <div className="flex align-items-center justify-content-center">
        <a className="cursor-pointer text-700 mr-5">
          <i className="pi pi-twitter"></i>
        </a>

        <a className="cursor-pointer text-700 mr-5">
          <i className="pi pi-facebook"></i>
        </a>

        <a className="cursor-pointer text-700">
          <i className="pi pi-github"></i>
        </a>
      </div>
    </div>
  );
}

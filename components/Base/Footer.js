export default function Footer() {
  return (
    <div className="surface-section px-4 py-6 md:px-6 lg:px-8 text-center">
      <div className="font-medium text-900 mt-4 mb-3">
        &copy; 2022 Atelier des Devs, Inc
      </div>
      <p className="text-600 line-height-3 mt-0 mb-4">
        Cursus metus aliquam eleifend mi. Malesuada pellentesque elit eget
        gravida. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum.
        Massa tincidunt dui ut ornare lectus sit amet est placerat.
      </p>
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

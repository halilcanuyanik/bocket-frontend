export default function Footer() {
  return (
    <footer className="rounded-lg m-4 text-gray-400 font-semibold">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-body sm:text-center">
          © {new Date().getFullYear()}{' '}
          <a href="#" className="hover:text-gray-600">
            Bocket™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
          <li>
            <a href="#" className="hover:text-gray-600 me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600 me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600 me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

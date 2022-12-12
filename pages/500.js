import Link from "next/link";

const Job = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="px-4 lg:py-12">
        <div className="lg:flex lg:gap-4">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="text-9xl font-bold text-blue-600">500</h1>
            <p className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Something Went Wrong
            </p>
            <p className="mb-8 text-center text-gray-500 md:text-lg">
              We got some problem on our side. Tray again.
            </p>
            <Link
              href="/"
              className="bg-blue-100 px-6 py-2 text-sm font-semibold text-blue-800"
            >
              Go home
            </Link>
          </div>
          <div className="mt-4"></div>
        </div>
      </div>
    </div>
  );
};
Job.layout = "L3";
export default Job;

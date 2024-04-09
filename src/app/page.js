import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" min-h-screen ">
      <nav class=" bg-gray-900">
        <div class="w-full px-16 flex flex-wrap items-center justify-between mx-auto py-4">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              AutomatedQuiz {process.env.MYSQL_USER}
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700  dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  class="block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:hover:text-blue-700  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </a>
              </li>
              <Link href={`/signup`}>
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign up
                </button>
              </Link>
            </ul>
          </div>
        </div>
      </nav>

      <div class="p-24 flex justify-between">
        <div class="p-8 align-center flex flex-col justify-center">
          <h1 class="text-4xl mb-4 font-extrabold">
            Revolutionize Your Teaching Experience with AI-Generated Quizzes
          </h1>
          <p class="text-sm text-gray-300 my-4">
            Say goodbye to the tedious task of creating quizzes manually. Our
            platform leverages the power of OpenAI to instantly generate
            customized quizzes based on the topics you provide.{" "}
          </p>
          <Link href={`/signup`}>
            <button
              type="button"
              class=" my-4 w-64 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get Started Now
            </button>
          </Link>
        </div>
        <div class="p-8">
          <img
            width={800}
            height={300}
            src="https://i.ibb.co/SdNYXgy/smaple.png"
          />
        </div>
      </div>
    </main>
  );
}

import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { authLogin } from "../services/authLogin"; // Assuming you have a login service
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await authLogin(form.email, form.password);

    console.log(response);

    setErrorMessage(response.message);
  };

  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="relative bg-gradient-to-r from-white to-green-900 flex items-center justify-center text-white text-xl overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFF" />
                <stop offset="100%" stopColor="#FFFFF" />
              </linearGradient>
            </defs>
            <path
              d="M0 300 Q200 400 400 300 T800 300 V600 H0 Z"
              fill="url(#waveGradient)"
              opacity="0.7"
            />
            <path
              d="M0 350 Q200 450 400 350 T800 350 V600 H0 Z"
              fill="url(#waveGradient)"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-center items-center h-full w-full bg-gray-100 ">
        <div className="grid gap-8 w-full max-w-md">
          <section
            id="back-div"
            className="bg-gradient-to-r from-gray-900 to-green-500 rounded-3xl"
          >
            <div className="border-8 border-transparent rounded-xl bg-white dark:bg-green-900 shadow-xl p-10 m-6 ">
              <h1 className="text-3xl font-bold text-center cursor-default dark:text-white text-gray-900 mb-18">
                Iniciar Sesión
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-lg dark:text-white font-bold"
                  >
                    Email/Usuario
                  </label>
                  <Input
                    id="email"
                    name="email"
                    className="border p-3 shadow-md dark:bg-white dark:text-black dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-200 transition transform hover:scale-105 duration-300"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-lg dark:text-white font-bold"
                  >
                    Contraseña
                  </label>
                  <Input
                    id="password"
                    name="password"
                    className="border p-3 shadow-md dark:bg-white dark:text-black dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-200 transition transform hover:scale-105 duration-300"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required=""
                  />
                </div>

                <b className="text-red-500 text-sm">{errorMessage}</b>
                <Button
                  className="w-full p-3 mt-4 text-white bg-gradient-to-r from-green-900 to-green-500 rounded-lg hover:scale-120 hover:bg-green-900 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-200 font-bold "
                  type="submit"
                  onClick={handleSubmit}
                  text="Iniciar Sesión"
                />
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;

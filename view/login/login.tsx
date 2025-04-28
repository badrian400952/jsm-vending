import { notifSucces, notifWarning } from "@/component/Alert";
import Button from "@/component/Button";
import Input from "@/component/input";
import { ILogin } from "@/interface/login";
import { api } from "@/network/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILogin) => {
    try {
      const response = await api.get(`/user`);
      const users = response.data;

      const userFound = users.find(
        (user: { username: string; password: string }) =>
          user.username === data.username && user.password === data.password
      );

      if (userFound) {
        notifSucces("Berhasil Login");
        localStorage.setItem("username", data.username);
        reset();
        router.push("/");
      } else {
        notifWarning("Username atau Password salah");
      }
    } catch (error) {
      notifWarning((error as string) || "Terjadi kesalahan saat login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-1/4 flex justify-center bg-gray-50 m-auto items-center mt-12 rounded-xl shadow-lg">
        <div className="border-b border-gray-900/10 pb-12 p-5 w-full">
          <h2 className="text-2xl font-semibold text-gray-900">Login</h2>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <div className="mt-2 w-full">
                <div className="mb-4">
                  <Input
                    {...register("username", {
                      required: "Username wajib diisi",
                      minLength: {
                        value: 3,
                        message: "Username minimal 3 karakter",
                      },
                    })}
                    classname="w-full"
                    label="Username"
                    name="username"
                    type="text"
                    autoComplete="off"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <Input
                    {...register("password", {
                      required: "Password wajib diisi",
                      minLength: {
                        value: 5,
                        message: "Password minimal 5 karakter",
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                        message: "Password harus mengandung huruf dan angka",
                      },
                    })}
                    classname="w-full"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="off"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button classname="w-1/4 border-green-500" type="submit">
                  Simpan
                </Button>

                <p className="text-sm mt-5">
                  Belom Punya{" "}
                  <span className="font-bold text-red-500">
                    <Link href={"/user"}>Akun?</Link>{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

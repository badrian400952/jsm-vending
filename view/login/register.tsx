import { notifSucces, notifWarning } from "@/component/Alert";
import Button from "@/component/Button";
import Input from "@/component/input";
import { IRegister } from "@/interface/login";
import { api } from "@/network/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegister>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: IRegister) => {
    if (data.password !== data.confirmPassword) {
      notifWarning("Password dan Konfirmasi Password tidak sama");
      return;
    }

    try {
      await api.post(`/user`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      notifSucces("Berhasil Register");
      reset();
      router.push("/user/login");
    } catch (error) {
      notifWarning(error as string);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-1/4 flex justify-center bg-gray-50 m-auto items-center mt-12 rounded-xl shadow-lg">
        <div className="border-b border-gray-900/10 pb-12 p-5 w-full">
          <h2 className="text-2xl font-semibold text-gray-900">Register</h2>

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

                <div className="mb-4">
                  <Input
                    {...register("email", {
                      required: "Email wajib diisi",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Format email tidak valid",
                      },
                    })}
                    classname="w-full"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="off"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <Input
                    {...register("password", {
                      required: "Password wajib diisi",
                      minLength: {
                        value: 6,
                        message: "Password minimal 6 karakter",
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

                <div className="mb-6">
                  <Input
                    {...register("confirmPassword", {
                      required: "Konfirmasi Password wajib diisi",
                      minLength: {
                        value: 6,
                        message: "Konfirmasi Password minimal 6 karakter",
                      },
                    })}
                    classname="w-full"
                    label="Konfirmasi Password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="off"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button classname="w-1/4 border-blue-500" type="submit">
                  Register
                </Button>
                <p className="text-sm mt-5">
                  Sudah Punya{" "}
                  <span className="font-bold text-red-500">
                    <Link href={"user/login"}>Akun?</Link>{" "}
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

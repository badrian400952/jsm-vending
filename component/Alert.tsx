import Swal from "sweetalert2";

const notifWarning = (msg: string, timer: number = 5000) => {
  const toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: timer,
    showCloseButton: true,
    color: "#ffffff",
    background: "#f09000",
    cancelButtonColor: "#ffffff",
  });
  toast.fire({
    title: msg,
  });
};

const notifSucces = (msg: string) => {
  const toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    showCloseButton: true,
    color: "#ffffff",
    background: "#28a745",
    icon: "success",
    cancelButtonColor: "#ffffff",
  });
  toast.fire({
    title: msg,
  });
};

export { notifSucces, notifWarning };

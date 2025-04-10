import Swal from "sweetalert2";

export const confirmModal = async (text: string) => {
  const confirm = await Swal.fire({
    title: "Внимение!",
    text,
    showDenyButton: true,
    theme: "dark",
    confirmButtonText: "Подтвердить",
    denyButtonText: "Отменить",
    icon: "warning",
  });
  return confirm.isConfirmed;
};

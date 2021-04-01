const defaultMessage = "Terjadi kesalahan, mohon dicoba lagi beberapa saat";
export const pinLengthMessage = "PIN kurang dari 6 digit. Cek kembali, ya!";

const errorMap = [
  { status: "78", message: "Akun LinkAja Kamu Terblokir" },
  { status: "LA907", message: "Kode verifikasi salah. Cek kembali, ya!" },
  { status: "LA908", message: "PIN salah. Coba kembali, ya!" },
];

export function publicError(status) {
  const errorObj = errorMap.find((e) => e.status === status);
  return errorObj.message || defaultMessage;
}

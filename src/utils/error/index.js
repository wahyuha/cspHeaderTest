const defaultMessage = 'Terjadi kesalahan, mohon dicoba lagi beberapa saat'

const errorMap = [
  {status: 'LA908', message: "PIN salah. Coba kembali, ya!"},
  {status: '78', message: 'Akun LinkAja Kamu Terblokir'},
]

export function publicError(status) {
  const errorObj = errorMap.find(e => e.status === status)
  return errorObj ? errorObj.message : defaultMessage
}
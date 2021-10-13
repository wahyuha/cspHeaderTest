import {
  createValidator,
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan,
  isNumeric,
} from "revalidate";

const isEmail = (value) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
};

export const isPhoneNumber = (value) => {
  return /^(08)(?:\d.*){8,}\d+/g.test(value);
};

const pinConfirmValid = (otherField) => {
  return createValidator(
    (message) => (value, allValues) => {
      if (!allValues || value !== allValues[otherField]) {
        return message;
      }
    },
    "PIN yang kamu masukkan berbeda. Cek lagi, ya!"
  );
};

const isValidEmail = createValidator(
  (message) => (value) => {
    if (value && !isEmail(value)) {
      return message;
    }
  },
  "Masukkan email dengan format yang sesuai"
);

export const cannotEmpty = isRequired({
  message: "Mohon diisi terlebih dahulu",
});

/**
 * PIN cannot sequence like: 123456
 * PIN cannot repeated like: 111111
 */
const isValidPin = createValidator(
  (message) => (value) => {
    const ascPattern = "0123456789";
    const descPattern = "9876543210";
    if (
      (value && /([0-9])\1{5}/g.test(value)) ||
      ascPattern.indexOf(value) >= 0 ||
      descPattern.indexOf(value) >= 0
    ) {
      return message;
    }
  },
  "Agar lebih aman, hindari kombinasi PIN dengan angka yang sama, ya! (Cth: 111111)"
);

const isValidName = createValidator(
  (message) => (value) => {
    if (value && !/^[a-zA-Z'\s]*$/.test(value)) {
      return message;
    }
  },
  "Anda tidak dapat menggunakan simbol seperti ,."
);

export const createAccountValidator = ({ ...props }) => {
  return combineValidators({
    name: composeValidators(
      isRequired({ message: "Isi terlebih dahulu, ya!" }),
      isValidName,
      hasLengthGreaterThan(2)({ message: "Mohon masukkan nama lengkap kamu" })
    )("name"),
    email: composeValidators(
      isRequired({ message: "Isi terlebih dahulu, ya!" }),
      isValidEmail
    )("email"),
  })(props);
};

export const createPinValidator = ({ ...props }) => {
  return combineValidators({
    pin: composeValidators(
      isRequired({ message: "Mohon buat PIN terlebih dahulu" }),
      isValidPin,
      isNumeric({ message: "Mohon diisi dengan angka" }),
      hasLengthGreaterThan(5)({
        message:
          "PIN terdiri dari kombinasi 6 angka yang berbeda dan tidak berurutan",
      })
    )("pin"),
    pinConfirm: composeValidators(
      pinConfirmValid("pin", "pinConfirm"),
      isNumeric({ message: "Mohon diisi dengan angka" }),
      isRequired({ message: "Masukkan ulang PIN yang telah kamu buat" }),
      hasLengthGreaterThan(5)({
        message:
          "PIN terdiri dari kombinasi 6 angka yang berbeda dan tidak berurutan",
      })
    )("pinConfirm"),
  })(props);
};

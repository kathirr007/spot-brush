// ^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$

const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\/])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

export default function isPasswordStrong(value) {
  return regex.test(value);
}

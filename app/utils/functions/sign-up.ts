export function setName(event: any, data: any, setData: any) {
  setData({ ...data, name: event.target.value });
}

export function setUsername(event: any, data: any, setData: any) {
  setData({ ...data, username: event.target.value });
}

export function setEmail(event: any, data: any, setData: any) {
  setData({ ...data, email: event.target.value });
}

export function setBirthDay(event: any, data: any, setData: any) {
  setData({ ...data, birthDay: event.target.value });
}

export function setBirthMonth(event: any, data: any, setData: any) {
  setData({ ...data, birthMonth: event.target.value });
}

export function setBirthYear(event: any, data: any, setData: any) {
  setData({ ...data, birthYear: event.target.value });
}

export function setPassword(event: any, data: any, setData: any) {
  setData({ ...data, password: event.target.value });
}

export function setConfirmPassword(event: any, data: any, setData: any) {
  setData({ ...data, confirmPassword: event.target.value });
}

export function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

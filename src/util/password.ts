export function validate(password: string) {
  return password.length > 7 && password.length < 13;
  const re = {
    capital: /[A-Z]/,
    digit: /[0-9]/,
    except: /[aeiou]/,
    full: /^[@#][A-Za-z0-9]{7,13}$/,
  };
  return re.full.test(password);
}

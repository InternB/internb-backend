export default class CheckCPFIsValid {
  public execute(cpf: string): boolean {
    const cpfArray = cpf.split('');

    const first = this.nthValidationDigit(cpfArray, 2);
    const second = this.nthValidationDigit(cpfArray, 1);

    if (parseInt(cpf[9], 10) !== first || parseInt(cpf[10], 10) !== second)
      return false;

    return true;
  }

  private nthValidationDigit(cpfArray: string[], digit: number): number {
    let sum = 0;
    let aux = 0;
    const weight = 12 - digit;

    for (let i = 0; ; i += 1) {
      sum += parseInt(cpfArray[i], 10) * (weight - aux);

      aux += 1;

      if (aux === 11 - digit) break;
    }

    let validationDigit = 11 - (sum % 11);

    if (validationDigit > 9) validationDigit = 0;

    return validationDigit;
  }
}
